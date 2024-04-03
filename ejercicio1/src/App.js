import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';

// Clase donde se almacena todo
class App extends React.Component {

  // constructor con el "atributo" que vamos a usar
  constructor(props) {
    super(props);
    this.state = {
      color: "danger",
    }
  }

  // funcion con la cual dependiendo del atributo color
  // pone un color u otro
  cambia() {
    if (this.state.color === "danger") {
      this.setState({ color: "success" })
    } else {
      this.setState({ color: "danger" })
    }
  }

  // Donde se muestra todo
  render() {
    return (
        // Boton al que le paso el color del atributo y al hacer click llama a la función anterior
        <Button color={this.state.color} onClick={() => this.cambia()}>
          Pulsa para cambiar de color
        </Button>
    );
  }
}

export default App;