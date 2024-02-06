import React, { Component, useState } from "react";
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";

const VentanaModalDiccionario = (props) => {
  const {
    className
  } = props;

  const [nombre, setNombre] = useState(undefined);
  const [telefono, setTelefono] = useState(undefined);

  const handleChange = (event) => {
    console.log(event.target.value)
    if (event.target.name == "nombre") {
      setNombre(event.target.value.toUpperCase())
    }
    if (event.target.name == "telefono") {
      setTelefono(event.target.value)
    }
  }

  const click = () => {
    console.log(nombre + "  " + telefono)
    props.insertaPersona(nombre, telefono);
    setNombre(undefined);
    setTelefono(undefined);
    props.toggle();
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={() => { setTelefono(undefined); setNombre(undefined); }}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>

          <FormGroup row>
            <Label sm={2} > Nombre: </Label>
            <Col sm={10}>
              <Input onChange={handleChange}
                id="nombre"
                name="nombre"
                type="Text" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label sm={2} > Teléfono: </Label>
            <Col sm={10}>
              <Input onChange={handleChange}
                id="telefono"
                name="telefono"
                type="Text" />
            </Col>
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => click()}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div>

  );
}

const Mostrar = (props) => {
  // ESTE COMPONENTE MUESTRA EL LISTÍN TELEFÓNICO.
  return (
    <ul>
      {auxList.map((e) => (
        <li>
          {e.nombre}-{e.telefono + "  "}
          <Button onClick={() => props.borrar(e.telefono)}>Borrar</Button>
        </li>
      ))}
    </ul>
  );
};



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
      listaUsuarios: [],
      isOpen: false,

    };
  }

  existe(t) {
    return this.state.listaUsuarios.find(e => e.telefono == t);
  }


  insertaPersona(n, t) {
    console.log(t)
    if (this.existe(t)) return;
    if (n == undefined || t == undefined) return;
    let p = this.state.listaUsuarios;
    let newp = { nombre: n, telefono: t };
    p.push(newp);
    this.setState({ listaUsuarios: p });
  }

  setIsOpen(d) {
    if (d == undefined) return;
    this.setState({ isOpen: d })
  }

  toggleModal() { this.setIsOpen(!this.state.isOpen); }


  borrar(t) {
    console.log("borrar" + t)
    let p = this.state.listaUsuarios.filter(e => e.telefono != t);
    this.setState({ listaUsuarios: p });
  }

  render() {
    return (
      <div className="App">
        <h1>Listin teléfonico</h1>
        <Mostrar elementos={this.state.listaUsuarios} borrar={(t) => this.borrar(t)} />
        <Button onClick={() => { this.toggleModal() }} color="info">Add</Button>
        <VentanaModalDiccionario
          insertaPersona={(nombre, telefono) => this.insertaPersona(nombre, telefono)}
          mostrar={this.state.isOpen}
          aceptar={"Añadir"}
          toggle={() => this.toggleModal()}
          titulo={"Alta en el listín"}
        />
      </div>
    );
  }
}
export default App;
