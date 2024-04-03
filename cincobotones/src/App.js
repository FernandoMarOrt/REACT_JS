import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button, Spinner } from 'reactstrap';

function Boton(props) {
  return (
    <Button color={props.color} onClick={() => props.cambia()} outline>
      {props.color}
    </Button>
  )
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "secondary",
    }
  }
  cambiaSecondary() {
    this.setState({ color: "secondary" })
  }
  cambiaDanger() {
    this.setState({ color: "danger" })
  }
  cambiaPrimary() {
    this.setState({ color: "primary" })
  }

  render() {
    return (
      <div className="App">
        <Spinner color={this.state.color} type="grow" />
        <Boton color="secondary" cambia={() => this.cambiaSecondary()} />
        <Boton color="danger" cambia={() => this.cambiaDanger()} />
        <Boton color="primary" cambia={() => this.cambiaPrimary()} />
      </div>
    );
  }
}

export default App;