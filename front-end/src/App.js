import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import img1 from './assets/1.webp';
import {
  Container, Content, Header, Form, Field, Label, Input, Select,
  BtnAcess, HeaderChat, ImgUser, NameUser, ChatBox, ConteudoChat, MsgEnviada, DetMsgEnviada, TextoMsgEnviada, MsgRecebida, DetMsgRecebida
} from './styles/styles'

let socket;

function App() {

  const ENDPOINT = "http://localhost:8080/";

  // const [logged, setLogged] = useState(false);
  // const [nome, setNome] = useState("");
  // const [sala, setSala] = useState("");
  const [logged, setLogged] = useState(true);
  const [nome, setNome] = useState("Bruno");
  const [sala, setSala] = useState("1");

  const [mensagem, setMensagem] = useState("");
  const [listamensagem, setListaMensagem] = useState([]);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
  }, []);

  useEffect(() => {
    socket.on("receber_mensagem", (dados) => {
      setListaMensagem([...listamensagem, dados])
    });
  })

  const conectarSala = () => {
    console.log("Acessou a sala " + sala + " com o usuário " + nome);
    setLogged(true);
    // alert("Acessou a sala " + sala + " com o usuário " + nome)
    socket.emit("sala_conectar", sala);
  }

  const enviarMensagem = async () => {
    // alert("Mensagem: " + mensagem)
    const conteudoMensagem = {
      sala,
      conteudo: {
        nome,
        mensagem
      }
    }
    // console.log(conteudoMensagem)
    await socket.emit("enviar_mensagem", conteudoMensagem);
    setListaMensagem([...listamensagem, conteudoMensagem.conteudo]);
    setMensagem("")

  }

  return (
    <Container className="App">

      {!logged ?
        <Content>
          <Header>Bate papo UOL socket</Header>
          <Form>
            <Field>
              <Label>Nome: </Label>
              <Input type="text" placeholder="Nome" value={nome} onChange={(text) => { setNome(text.target.value) }}
              />
            </Field>
            <Field>
              <Label>Sala: </Label>
              {/* <input type="text" placeholder="Sala" value={sala} onChange={(text) => { setSala(text.target.value) }}
          /> <br /> <br /> */}
              <Select name="sala" value={sala} onChange={text => setSala(text.target.value)}>
                <option value="">Selecione</option>
                <option value="1">Twitch</option>
                <option value="2">Discord</option>
                <option value="3">UFES</option>
                <option value="4">Github</option>
              </Select>
            </Field>
            <BtnAcess onClick={conectarSala}>Acessar Sala</BtnAcess>
          </Form>
        </Content>
        :
        <ConteudoChat>
          <HeaderChat>
            <ImgUser src={img1} alt={nome} />
            <NameUser>{nome}</NameUser>
          </HeaderChat>
          <ChatBox>
            <MsgEnviada>
              <DetMsgEnviada>
                <TextoMsgEnviada>Oi tudo bom?</TextoMsgEnviada>
              </DetMsgEnviada>
            </MsgEnviada>
            <MsgRecebida>
              <DetMsgRecebida>
                
              </DetMsgRecebida>
            </MsgRecebida>
            {listamensagem.map((msg, key) => {
              return (
                <div key={key}>
                  {msg.nome} : {msg.mensagem}
                </div>
              )
            })}
            <input type="text" name="mensagem" placeholder="Mande a mensagem aqui"
              value={mensagem} onChange={(texto) => { setMensagem(texto.target.value) }} />
            <button onClick={enviarMensagem}>Enviar</button>
          </ChatBox>
        </ConteudoChat>
      }

    </Container>
  );
}

export default App;
