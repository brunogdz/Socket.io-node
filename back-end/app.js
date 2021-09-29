const express = require('express');
const socket = require('socket.io');
const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.send('Aoba')
})

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
// server, e as rotas {}
io = socket(server)

// Assim que fizer uma conexão eu vou ter um id da conexão, cada usuário receber um id
io.on("connection", (socket) => {
    console.log(socket.id);
})