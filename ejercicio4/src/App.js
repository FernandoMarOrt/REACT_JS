import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './App.css';
import ListaChicos from './Componentes/ListaChicos';
import Formulario from './Componentes/Formulario';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chicos: [
        { id: 1, nombre: "Adrián", nota: 8 },
        { id: 2, nombre: "Rubén", nota: 9 },
        { id: 3, nombre: "Pepe", nota: 9 }
      ]
    }
  }


  // coger los datos del input y los mete en el state 
  handleChicoNuevo(event) {
    event.preventDefault();

    let copiaChicos = this.state.chicos;
    let auxId = copiaChicos.length+1;

    let auxChico = {
      id: auxId,
      nombre: event.target.nombre.value,
      nota: event.target.nota.value
    };

    copiaChicos.push(auxChico);

    this.setState({chicos: copiaChicos})
  }


  render() {
    return (
      <div className="App">
        <h1>¿Que nota se merecen?</h1>
        <ListaChicos chicos={this.state.chicos} />
        <Formulario funcion={(e) => this.handleChicoNuevo(e)} />
      </div>
    );
  }
}

export default App;