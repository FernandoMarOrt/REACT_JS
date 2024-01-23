import React, { Component, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Altas = (props) => {
  // UTILICE HOOKS EN ESTE COMPONENTE
  const [Usuario, SetUsuario] = useState([]);

  function handleChange(props) {

    let nombre = "1"
    let apellidos = "2"
    let telefono = "3"

    let lista = [nombre,apellidos,telefono];

    
    //props.listintelefonico.push(lista)
    
    //Usuario.SetUsuario
    //let usuario = event.target.value

    
  }                             

  return (
    <Form>
      <FormGroup>
        <Label for="Nombre">Nombre:</Label>
        <Input name="nombre" id="nombre" placeholder="introduzca nombre" />
        <Label for="Nombre">Apellidos:</Label>
        <Input name="apellidos" id="apellidos" placeholder="introduzca apellidos" />
        <Label for="Nombre">Telefono:</Label>
        <Input name="telefono" id="telefono" placeholder="introduzca telefono" />
      </FormGroup>
      <Button onClick={handleChange()}>Añadir</Button>
    </Form>
  );
}
const Mostrar = (props) => {
  // ESTE COMPONENTE MUESTRA EL LISTÍN TELEFÓNICO.
  function eliminar(props) {
            
  }
  return (
    props.listin.map((u,index) => <li key={index}>{u}  <Button onClick={eliminar()}>X</Button></li>)
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN DE LA APLICACIÓN.EL LISTÍN TELEFÓNICO
      listintelefonico: ["prueba", "prueba2"], //lista para guardar informacion

    };
  }

  // DEBERÁ RENDERIZAR AL MENOS LOS DOS COMPONENTES ANTERIORES
  render() {
    return (
      <div className="App">
        <Mostrar
          listin={this.state.listintelefonico}
        />
        <Altas
          listin={this.state.listintelefonico}
        />
      </div>
    );
  }
}
export default App;