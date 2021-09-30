import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

let socket;

function App() {

  const ENDPOINT = "http://localhost:8080/";

  const [logged, setLogged] = useState(false);
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
  }, []);

  const conectarSala = () => {
    console.log("Acessou a sala " + sala + " com o usuário " + nome);
    setLogged(true);
    // alert("Acessou a sala " + sala + " com o usuário " + nome)
    socket.emit("sala_conectar", sala);
  }

  return (
    <div className="App">
      <h1>Bate Papo Socket</h1>
      {!logged ?
        <>
          <label>Nome: </label>
          <input type="text" placeholder="Nome" value={nome} onChange={(text) => { setNome(text.target.value) }}
          /> <br /> <br />

          <label>Sala: </label>
          {/* <input type="text" placeholder="Sala" value={sala} onChange={(text) => { setSala(text.target.value) }}
          /> <br /> <br /> */}
          <select name="sala" value={sala} onChange={text => setSala(text.target.value)}>
            <option value="">Selecione</option>
            <option value="1">Twitch</option>
            <option value="2">Discord</option>
            <option value="3">UFES</option>
            <option value="4">Github</option>
          </select>
          <button onClick={conectarSala}>Acessar Sala</button>
        </>
        :
        "Logado com sucesso!"}

    </div>
  );
}

export default App;
