const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const app = express()
const port = 8080

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

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
// server, e as rotas {}
// o cor ao dar o "*" qualquer URL pode fazer conexão
io = socket(server, {cors: {origin: "*"}})

// Assim que fizer uma conexão eu vou ter um id da conexão, cada usuário receber um id
io.on("connection", (socket) => {
    console.log(socket.id);
})