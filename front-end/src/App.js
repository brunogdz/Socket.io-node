import React, { useState } from 'react';


function App() {

  const [logged] = useState(false);
  const [nome, setNome] = useState("");
  const [sala, setSala] = useState("");

  const conectarSala = () => {
    console.log("Acessou a sala " + sala + " com o usuário " + nome)
    // alert("Acessou a sala " + sala + " com o usuário " + nome)
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
