import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';

import img1 from './assets/1.webp';
import {
  Container, Content, Header, Form, Field, Label, Input, Select,
  BtnAcess, HeaderChat, ImgUser, NameUser, ChatBox, ConteudoChat, MsgEnviada, DetMsgEnviada, TextoMsgEnviada, MsgRecebida, DetMsgRecebida, TextoMsgRecebida, EnviarMsg, CampoMsg, BtnEnviar
} from './styles/styles'

import api from './config/configApi'

let socket;

function App() {

  const ENDPOINT = "http://localhost:8080/";

  const [logged, setLogged] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [sala, setSala] = useState("");
  // const [logged, setLogged] = useState(true);
  // const [nome, setNome] = useState("Bruno");
  // const [sala, setSala] = useState("1");

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

  const conectarSala = async e => {
    e.preventDefault();
    console.log("Acessou a sala " + sala + " com o email " + email);

    const headers = {
      'Content-Type': 'application/json'
    }
    await api.post('/validar-acesso', { email }, { headers })
      .then((response) => {
        console.log(response.data.mensagem);
        console.log(response.data.usuario.id);
        console.log(response.data.usuario.nome);
      }).catch((err) => {
        if(err.response){
          console.log(err.response.data.mensagem);
        }else{
          console.log("Erro: Tente mais tarde")
        }
      })
    // setLogged(true);
    // // alert("Acessou a sala " + sala + " com o usuário " + nome)
    // socket.emit("sala_conectar", sala);
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
          <Form onSubmit={conectarSala}>
            <Field>
              <Label>Email: </Label>
              <Input type="text" placeholder="email" name="email" value={email} onChange={(text) => { setEmail(text.target.value) }}
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
            <BtnAcess>Acessar Sala</BtnAcess>
          </Form>
        </Content>
        :
        <ConteudoChat>
          <HeaderChat>
            <ImgUser src={img1} alt={nome} />
            <NameUser>{nome}</NameUser>
          </HeaderChat>
          <ChatBox>
            {listamensagem.map((msg, key) => {
              return (
                <div key={key}>
                  {nome === msg.nome ?
                    <MsgEnviada >
                      <DetMsgEnviada>
                        <TextoMsgEnviada>{msg.nome} : {msg.mensagem}</TextoMsgEnviada>
                      </DetMsgEnviada>
                    </MsgEnviada>
                    :
                    <MsgRecebida>
                      <DetMsgRecebida>
                        <TextoMsgRecebida>{msg.nome} : {msg.mensagem}</TextoMsgRecebida>
                      </DetMsgRecebida>
                    </MsgRecebida>
                  }
                </div>
              )
            })}

          </ChatBox>
          <EnviarMsg>
            <CampoMsg type="text" name="mensagem" placeholder="Mande a mensagem aqui"
              value={mensagem} onChange={(texto) => { setMensagem(texto.target.value) }} />
            <BtnEnviar onClick={enviarMensagem}>Enviar</BtnEnviar>
          </EnviarMsg>

        </ConteudoChat>
      }

    </Container>
  );
}

export default App;
