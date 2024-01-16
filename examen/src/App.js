import React, { Component, Row, Col } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const MapaBotones = (props) => {
  // este componente pinta el tablero 9x9 con las props que le paso.
  let array = props.listaBotones

  for (let j = 0; j < 9; j++) {

    array.push(
      <Button outline />
    )

  }

  return array
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: Array(9).fill(null),
      // no se puede modificar el state
    }
  }


  clica(x, y) {
    // x se supone que la columna, y la fila
  }


  componentWillMount() {

    const aux = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        aux.push([i][j])
      }
    }

    // aquí es donde creo las nueve columnas con los datos iniciales.
  }


  render() {
    return (
      <div className="App">
        <h1> BUCHACA </h1>
        <MapaBotones listaBotones={this.state.listaBotones} />
      </div>
    );
  }
}


export default App;