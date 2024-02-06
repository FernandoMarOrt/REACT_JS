import React, { Component, useState } from "react";
import { Alert, Button, Navbar, NavbarBrand, Card, CardBody, CardTitle,CardHeader,ListGroup,ListGroupItem, CardSubtitle, CardText, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { PREGUNTAS } from "./componentes/datos";
import "./App.css";

const Preguntas = (props) => {

  let obj = props.preguntas.map(p => {
    let res = p.respuestas.map(r => <><Button color="primary" outline  onClick={() => props.respuesta()}>{r.respuesta}</Button>{"  "}</>)
    return (
      <Card
      style={{
        width: '60%',
        margin: '2rem auto',
      }}
    >
      <CardHeader
        style={{
          fontWeight: "bold",
          color: "white",
          backgroundColor: "black"
        }}
      >
      {<h5>{p.orden} - {p.texto}</h5>}
      </CardHeader>
      <ListGroup flush style={{margin: "1rem"}}>
        {res}
      </ListGroup>
    </Card>
    )
  });
  return (
    <div>
      {obj}
    </div>
  );
}

const Fototipo = (props) => {
  // ESTE COMPONENTE MUESTRA EL FOTOTIPO
  const [fotoTipo, setFotoTipo] = useState(undefined);
  const [tipoPiel, setTipoPiel] = useState("")
  props.fototipos.map((f, i, arr) => {

    if (fotoTipo == undefined && f >= props.puntuacion && arr[i - 1] < props.puntuacion) {
      setFotoTipo(i);
      setTipoPiel(props.tipoPiel[i - 1])
    
    }
  })
  return (
    <div>
      <Col
        sm={{
          offset: 1,
          order: 2,
          size: 6
        }}
      >
        <Card color="light" style={{ width: '23rem' }}>
          <CardBody>
            <CardTitle tag="h5">
              USTED TIENE FOTOTIPO {fotoTipo}
            </CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6"     >
              <p>Su puntuación en el test fue de {props.puntuacion}</p>
            </CardSubtitle>
            <CardText>
              <p>{tipoPiel}</p>
            </CardText>
          </CardBody>
        </Card>
      </Col>
    </div>
  );
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntas: PREGUNTAS,
      puntuacion: 0,
      fototipos: [0, 7, 21, 42, 68, 84, 100],
      tipoPiel: [
        "Puntuación entre 0-7 -> TIPO DE PIEL I: Muy sensible a la luz solar",
        "Puntuación entre 8-21 -> TIPO DE PIEL II: Sensible a la luz solar",
        "Puntuación entre 22-42 -> TIPO DE PIEL III: Sensibilidad normal a la luz solar",
        "Puntuación entre 43-68 -> TIPO DE PIEL IV: La piel tiene tolerancia a la luz solar",
        "Puntuación entre 69-84 -> TIPO DE PIEL V: La piel es oscura. Alta tolerancia",
        "Puntuación +85 -> TIPO DE PIEL VI: La piel es negra. Altísima tolerancia"
      ],
      ocultar: false,
    };
  }



  render() {
    let obj = <Preguntas preguntas={this.state.preguntas} respuesta={(orden, valor) => this.respuesta(orden, valor)} />
    if (this.state.ocultar){
      obj = <Fototipo puntuacion={this.state.puntuacion} fototipos={this.state.fototipos} tipoPiel={this.state.tipoPiel}/>
    }
  
    return (
      <div className="App">
        <Navbar className="my-2">
          <NavbarBrand href="#">
          <h1>AVERIGUA TU FOTOTIPO</h1>
          </NavbarBrand>
        </Navbar>
        {obj}
      </div>
    );
  }
}
export default App;









