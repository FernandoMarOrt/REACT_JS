import React, { Component, useState } from "react";
import { Button, Navbar, NavbarBrand, Card, CardBody, CardTitle, CardHeader, ListGroup, CardSubtitle, CardText, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import { PREGUNTAS } from "./componentes/datos";
import Grafica from './componentes/Grafica';
import axios from 'axios';
import "./App.css";

const Preguntas = (props) => {

  let obj = props.preguntas.map(p => {
    let res = p.respuestas.map(r => <><Button
      color="primary"
      outline
      onClick={() => props.respuesta(p.orden, r.valor)}
      disabled={props.respuestasDesactivadas.includes(p.orden)}
    >{r.respuesta}</Button>{"  "}</>)
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
        <ListGroup flush style={{ margin: "1rem" }}>
          {res}
        </ListGroup>
      </Card>
    )
  });
  return (
    <div>
      {obj}
      <Button color="success" onClick={() => props.resultados()}>VER MIS RESULTADOS</Button>
    </div>
  );
}

const Fototipo = (props) => {


  const [imagenes, setImagenes] = useState("");
  const [fotoTipo, setFotoTipo] = useState(undefined);
  const [tipoPiel, setTipoPiel] = useState("");
  const resultadosTotales = props.resultadosTotales;

  props.fototipos.map((f, i, arr) => {

    if (fotoTipo == undefined && f >= props.puntuacion && arr[i - 1] < props.puntuacion) {
      setFotoTipo(i); /*Este es*/ 
      setTipoPiel(props.tipoPiel[i - 1])
      setImagenes(props.imagenes[i - 1])
    }

  })
  return (
    <div id="resultadofinal">
      <Col id="carta"
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
              <img src={`${process.env.PUBLIC_URL}/${imagenes}`} alt="imagenes" />
            </CardSubtitle>
            <CardText>
              <p>{tipoPiel}</p>
            </CardText>
          </CardBody>
        </Card>
      </Col>
      <div id="graficadatos">
      <Grafica datos={resultadosTotales}/>
      </div>
    </div>
  );
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntas: PREGUNTAS,
      puntuacion: 0,
      fototipos: [-1, 7, 21, 42, 68, 84, 100],
      respuestasDesactivadas: [],
      tipoPiel: [
        "Puntuación entre 0-7 -> TIPO DE PIEL I: Muy sensible a la luz solar",
        "Puntuación entre 8-21 -> TIPO DE PIEL II: Sensible a la luz solar",
        "Puntuación entre 22-42 -> TIPO DE PIEL III: Sensibilidad normal a la luz solar",
        "Puntuación entre 43-68 -> TIPO DE PIEL IV: La piel tiene tolerancia a la luz solar",
        "Puntuación entre 69-84 -> TIPO DE PIEL V: La piel es oscura. Alta tolerancia",
        "Puntuación +85 -> TIPO DE PIEL VI: La piel es negra. Altísima tolerancia"
      ],
      ocultar: false,
      mensaje: false,
      imagenes: [
        "tipo1.png",
        "tipo2.png",
        "tipo3.png",
        "tipo4.png",
        "tipo5.png",
        "tipo6.png",
      ],
      resultadosTotales: [0, 0, 0, 0, 0, 0],
      numerofototipo: null,
    };
  }

  guardarResultadosEnArchivo() {
    const resultadosTotales = this.state.resultadosTotales.slice(); // Utiliza slice para clonar el array
  
    axios({
      method: 'post',
      //url: "./recuento",
      url: "http://localhost/Proyectos/JSServer/recuento/index.php",
      data: {
        array: resultadosTotales
      }
    })  
    .then(res => {
      console.log(res.data); //respuesta del servidor
      console.log("RESULTADOS", resultadosTotales);
      const nuevosValores = res.data.nuevosValores;
       this.setState({ resultadosTotales: nuevosValores });
    })
    .catch(error => {
      console.error('Error al enviar datos al servidor:', error);
    });
  }
  



  respuesta(orden, valor) {


    if (!this.state.respuestasDesactivadas.includes(orden)) {//Si la respuesta no esta desactivada

      const nuevaPuntuacion = this.state.puntuacion + valor;
      const nuevasRespuestasDesactivadas = this.state.respuestasDesactivadas.concat(orden);

      this.setState({
        puntuacion: nuevaPuntuacion,
        respuestasDesactivadas: nuevasRespuestasDesactivadas,
      });

    }
  }

  resultados() {
    if (this.state.respuestasDesactivadas.length === this.state.preguntas.length) {
      const fototipo = this.state.fototipos.findIndex(score => this.state.puntuacion <= score);
      const numeroFototipo = fototipo >= 0 ? fototipo : null;
  
      // Actualizar el array resultadosTotales
      if (numeroFototipo !== null) {
        this.setState(prevState => ({
          resultadosTotales: prevState.resultadosTotales.map((value, index) =>
            index === numeroFototipo - 1 ? value + 1 : value
          ),
          ocultar: true,
          numeroFototipo: numeroFototipo,
        }), () => {
          this.guardarResultadosEnArchivo();
        });
      }
    } else {
      this.setState({ mensaje: true });
    }
  }
  



  render() {
    let obj = <Preguntas
      preguntas={this.state.preguntas}
      respuestasDesactivadas={this.state.respuestasDesactivadas}
      respuesta={(orden, valor) => this.respuesta(orden, valor)}
      resultados={() => this.resultados()}
    />


    if (this.state.ocultar) {
      obj = <Fototipo puntuacion={this.state.puntuacion}
        fototipos={this.state.fototipos}
        tipoPiel={this.state.tipoPiel}
        imagenes={this.state.imagenes}
        numerofototipo={this.state.numerofototipo}
        resultadosTotales={this.state.resultadosTotales}
      />
    }

    let obj2 = ""
    if (this.state.mensaje) {
      obj2 = <p style={{ fontWeight: "bold", color: "red" }}>Contesta todas las preguntas por favor</p>
    }

    return (
      <div className="App">
        <Navbar className="my-2">
          <NavbarBrand href="#">
            <h1>AVERIGUA TU FOTOTIPO</h1>
          </NavbarBrand>
        </Navbar>
        {obj}
        {obj2}

      </div>
    );
  }
}
export default App;









