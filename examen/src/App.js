import {
  Modal, ModalHeader, ModalBody, ModalFooter, Button, Toast,
  ToastBody, ToastHeader
} from 'reactstrap';
import React, { useState } from 'react';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
/* ENUNCIADO DEL EJERCICIO.
Se pide que realices el programa que visualizas en el vídeo adjunto.
Se considerará incorrecto un programa que acumule la funcionalidad en solo
un componente o cambie la estructura de clases.
Cosas que se valorarán:
Legibilidad del código.
Longitud del código.
No se valorará el aspecto estético de la web.
El programa realiza la funcionalidad requerida.
Que no haya errores en la consola.
La eficiencia.
La modularidad (alta cohesión y bajo acoplamiento).
Que el código sea limpio, flexible, reutilizable y mantenible.
Sigue los principios SOLID.
Otros criterios.
A continuación se describen los componentes que tienes que implementar
para completar este ejercicio:
-----------COMPONENTE PREGUNTAS-----------
Es el encargado de mostrar la pregunta al usuario
-----------COMPONENTE VENTANAMODAL-----------
Es el encargado de mostrar el resultado del test y preguntar si lo quiere
hacer de nuevo
-----------PREGUNTAS------------
Las preguntas se muestran de manera aleatoria. Para ello te proporciono la
función aleatorio que siempre hemos utilizado.
Importante const PREGUNTAS:
 
EN LAS PREGUNTAS SI RESPUESTA ES 1 Y EL USUARIO ESCOJE SI -> ES
NOMOFÓBICO (No nomofóbico en caso contrario)
Y SI EL USUARIO ELIGE NO Y RESPUESTA ES 0 -> EL USUARIO ES NOMOFÓBICO (No
nomofóbico en caso contrario)
-----------RESPUESTAS-----------
DEPENDIENDO DE LAS RESPUESTAS:
Al final de las preguntas y atendiendo las respuestas...
Si el porcentaje de las respuestas es < 50 mostrará En principio no
tienes nada de que preocuparte"
Si el porcentaje de las respuestas es entre 50-69 mostrará "Empiezas a
tener signos de dependencia del móvil. Puedes utilizar técnicas como
apagar el móvil cuando no lo necesitas, cuando duermes, etc."
Si el porcentaje de las respuestas es entre 70-79 mostrará "Tienes una
gran dependencia del móvil. Deberías seguir un plan de «desintoxicación»
del móvil como por ejemplo dejar el móvil en casa cuando vas a comprar,
apagarlo durante la noche, apagarlo durante horas de clase o trabajo,
etc."
Si el porcentaje de las respuestas es >= 80 mostrará "Tus síntomas de
dependencia son muy preocupantes. Además de todas las técnicas de los
apartados anteriores deberías plantearte un plan de desintoxicación del
móvil que consista en estar una o dos semanas sin utilizarlo. Si ves que
no puedes hacerlo por ti mismo, pide ayuda a un profesional."
*/
const PREGUNTAS = [
  {
    "pregunta": "Cuando mandas un mensaje por whatsapp esperas siempre al doble check.Si no aparece vuelves a abrir el terminal para revisarlo alrato.","respuesta":1},
  {"pregunta": "Antes de acostarte siempre miras el móvil a ver si tienemensajes o notificaciones.","respuesta":1},
  {"pregunta": "Te despiertas antes de tiempo para jugar, mandar mensajes,actualizar perfiles, ...con el teléfono móvil.","respuesta":1},
  {"pregunta": "Si sales de casa sin el móvil volverías a cogerlo aunque llegues tarde a tu cita.","respuesta":1},
  { "pregunta": "No tienes miedo a quedarte sin batería.", "respuesta": 0 },
  {"pregunta": "Cuando tienes la batería baja desactivas ciertas aplicaciones u opciones del teléfono como la WiFi, bluetooth para no quedarte sin batería.","respuesta":1},
  
  {"pregunta": "Tienes ansiedad cuando tienes llamadas perdidas. Llamas a los números y te preocupas si no responden.","respuesta":1},
  {"pregunta": "Miras la cobertura cuando estas en algún sitio con los amigos, esperando, etc.","respuesta":1},
  {"pregunta": "Sueles hacer alguna otra cosa mientras que miras al móvilcomo comer, lavarte los dientes, etc.","respuesta":1},
  {"pregunta": "No sueles mirar la cobertura del móvil con frecuencia","respuesta":0},
  { "pregunta": "Vas al baño siempre con el móvil.", "respuesta": 1 },
  { "pregunta": "A veces sales a la calle sin el móvil.", "respuesta": 0 }
];

const Preguntas = (props) => {
  return (
    <div className="p-3 my-2 rounded bg-docs-transparent-grid">
      <Toast>
        <ToastHeader>
          {props.cabecera}
        </ToastHeader>
        <ToastBody>
          {props.texto}
        </ToastBody>
        <div class="container">
          <div class="row justify-content-center">
            <Button outline color="secondary"
              onClick={() => props.si()}>Si</Button>&nbsp;
            <Button outline color="secondary"

              onClick={() => props.no()}>No</Button>

          </div>
        </div>
      </Toast>
    </div>
  );
}
const VentanaModal = (props) => {

  const {
    className
  } = props;
  const [modal, setModal] = useState(true);
  const toggle = () => setModal(!modal);
  const seguir = () => { props.seguir(); setModal(!modal); };
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          {props.texto}
        </ModalBody>
        <ModalFooter>
          <Button color="primary"
            onClick={seguir}>{props.textoSeguir}</Button>
          <Button color="secondary" onClick={toggle}>Salir</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preguntas: JSON.parse(JSON.stringify(PREGUNTAS)),
      aciertos: 0,
      fallos: 0,
      textoPregunta: "",
      respuesta: 0,
      finalizado: 0,
    };
  }
  componentDidMount() {

    this.siguiente();
  }
  aleatorio(min, max) {
    var horquilla = max - min;
    return Math.floor(Math.random() * horquilla + min);
  }
  acierto() {
    let aux = this.state.aciertos;
    aux++;
    this.setState({ aciertos: aux });
    this.siguiente();
  }
  fallo() {
    let aux = this.state.fallos;
    aux++;
    this.setState({ fallos: aux });
    this.siguiente();
  }
  siguiente() {
    console.log(this.state)
    if (this.state.preguntas.length === 0) {
      this.setState({ finalizado: 1 });
      console.log("finalizando")
      return;
    }
    let n = this.aleatorio(0, this.state.preguntas.length - 1);
    let p = this.state.preguntas[n];
    console.log(p);
    let aux = this.state.preguntas.filter((e, inx) => inx !== n);
    this.setState({
      preguntas: aux, quest: p, textoPregunta: p.pregunta, respuesta: p.
        respuesta
    });
  }
  seguir() {

    this.setState(
      {
        preguntas: JSON.parse(JSON.stringify(PREGUNTAS)), aciertos: 0, fallos: 0, finalizado: 0
      });
  }
  getTexto() {
    let total = this.state.fallos + this.state.aciertos;
    let porcentaje = this.state.aciertos * 100 / total;
    if (porcentaje < 50) return "En principio no tienes nada de que preocuparte";
    if (porcentaje < 70) return "Empiezas a tener signos de dependencia del móvil.Puedes utilizar técnicas como apagar el móvil cuando no lo necesitas, cuando duermes, etc.";
    if (porcentaje < 80) return "Tienes una gran dependencia del móvil. Deberías seguir un plan de «desintoxicación» del móvil como por ejemplo dejar el móvil en casa cuando vas a comprar, apagarlo durante la noche, apagarlo durante horas de clase o trabajo, etc.";
    return "Tus síntomas de dependencia son muy preocupantes. Además de todas las técnicas de los apartados anteriores deberías plantearte un plan de desintoxicación del móvil que consista en estar una o dos semanas sin utilizarlo.Si ves que no puedes hacerlo por ti mismo, pide ayuda a un profesional.";
  }
  render() {
    let lista = [];
    if (this.state.finalizado) {
      let txt = this.getTexto();
      lista.push(<VentanaModal textoSeguir="Hacerlo de nuevo"
        seguir={() => this.seguir()} titulo="Fin del test" texto={txt} />);
    } else {
      if (this.state.respuesta === 1) {
        lista.push(<Preguntas cabecera="Test Nomofobia"
          si={() => this.acierto()} no={() => this.fallo()}
          texto={this.state.textoPregunta} respuesta={this.state.respuesta} />);
      } else {
        lista.push(<Preguntas cabecera="Test Nomofobia"
          si={() => this.fallo()} no={() => this.acierto()}
          texto={this.state.textoPregunta} respuesta={this.state.respuesta} />);
      }

    }
    console.log(this.state.finalizado)
    return (
      <div className="App">
        <header className="App-header">
          {lista}
        </header>
      </div>
    );
  }
}
export default App;