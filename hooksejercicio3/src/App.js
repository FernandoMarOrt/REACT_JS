import logo from './logo.svg';
import './App.css';
import { Button, Input, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component, useState } from 'react'
import ReactDOM from "react-dom";
function ListaDeseos(props) {
  return (
    <ul>{props.deseos.map(d =>
      <Row>
        <Col sm={{ offset: 1, size: 1 }}>
          <li>{d}</li>
        </Col>
        <Col sm={{ offset: 1, size: 2 }}>
          <Borrar deseo={d} quitar={(elemento) => props.quitar(elemento)} />
        </Col>
      </Row>
    )}</ul>
  );
}


function Deseo(props) { //Cuando se envia , añade el deseo escrito en el input
  return (
    <form onSubmit={props.añadirDeseo}>
      <Input type="text" placeholder="Escribe tu deseo" name="deseo" />
    </form>
  );
}


function Borrar(props) { //Boton borrar de la lista cuando se pulsa borra el deseo seleccionado
  return (
    <Button onClick={(deseo) => props.quitar(props.deseo)}>
      Borrar {props.deseo}
    </Button>
  )
}


//Fuerza el programa para que se resfresque los datos (Obligatorio)
function useForceUpdate() {
  let [value, setState] = useState(true);
  return () => setState(!value);
}


function App(props) {
  const [deseos, setDeseos] = useState(["GAMBAS", "JAMÓN"]); //Lista inicial de deseos

  const quitar = (elemento) => { //Funcion para quitar un elemento de la lista
    setDeseos(deseos.filter(d => d != elemento));
  }

  let refrescar = useForceUpdate();
  
  const handleAñadirDeseo = (event) => {
    event.preventDefault();
    let d = deseos;
    d.push(event.target.deseo.value)
    setDeseos(d)
    refrescar()
  }

  return (
    <div className="App">
      <h1> AÑADE TU REGALO FAVORITO </h1>
      <ListaDeseos quitar={(elemento) => quitar(elemento)} deseos={deseos}
      />
      <Deseo añadirDeseo={handleAñadirDeseo} />
    </div>
  );
}

export default App;
