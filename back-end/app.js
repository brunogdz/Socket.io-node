const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express()
const port = 8080;

const Usuario = require('./models/Usuario');

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
})

app.get('/', (req, res) => {
  res.send('Aoba')
})

app.post('/cadastrar-usuario', async (req, res) => {
  var dados = req.body;
  // Vamos validar caso aconteça de ter o mesmo usuario então não deixar
  // que ocorra repetição dos dados no banco
  const usuario = await Usuario.findOne({
    where: {
      email: dados.email
    }
  })

  if(usuario){
    return res.status(400).json({
      erro: true,
      mensagem: 'Usuário já cadastrado!'
    })
  }
  await Usuario.create(dados)
    .then(() => {
      return res.json({
        erro: false,
        mensagem: "Usuario cadastrado com sucesso!"
      });
    }).catch(() => {
      return res.status(400).json({
        erro: true,
        mensagem: "Erro Usuário não cadastrado com sucesso!"
      })
    })
});

app.post('/validar-acesso', async(req,res) => {
  const usuario = await Usuario.findOne({
    attributes: ['id','nome'],
    where: {
      email: req.body.email
    }
  });

  if(usuario === null){
    return res.status(400).json({
      erro: true,
      mensagem: "Erro: Usuário não encontrado no banco de dados"
    });
  };

  return res.json({
    erro: false,
    mensagem: "Login realizado com sucesso!",
    usuario
    
  })
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
// server, e as rotas {}
// o cor ao dar o "*" qualquer URL pode fazer conexão
io = socket(server, { cors: { origin: "*" } })

// Assim que fizer uma conexão eu vou ter um id da conexão, cada usuário receber um id
io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("sala_conectar", (dados) => {
    console.log("Sala selecionada: " + dados)
    socket.join(dados);
  });


  socket.on("enviar_mensagem", (dados) => {
    console.log(dados);
    socket.to(dados.sala).emit("receber_mensagem", dados.conteudo);
  })
})