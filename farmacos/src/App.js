import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
Alert, Row, Col, UncontrolledAccordion, AccordionItem,
AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader,
ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';
import { FARMACOS } from './componentes/datos.js';

const VentanaModalDiccionario = (props) => {
  const { className } = props;

  const [medicamento, setMedicamento] = useState("");
  const [filtro, setFiltro] = useState('');

  const farm = FARMACOS;
//con esto haremos el filter
  const handleChange = (event) => {
    const target = event.target;
    if (target.name === "filtro") {
      setFiltro(target.value.toUpperCase())
    }
    if (target.name === "selectMulti") {
      setMedicamento(target.value);
      console.log(medicamento)
    }
  }
//con eston creamos la array del select para que muestre las opciones segun el filtro
  const getData = () => {
    if (filtro !== "") {
      return (farm.filter(f => f.descATC.search(filtro) >= 0).map(e => (
        <option key={e.codATC}>{e.codATC}|{e.descATC}</option>
      )))
    }
    return (farm.map(e => (
      <option key={e.codATC}>{e.codATC}|{e.descATC}</option>
    )))
  }
//Poner el medicamento en una label por que sino convierte todo en un objeto por que le da la gana
  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} >
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={2} > Filtrar: </Label>
            <Col sm={10}>
              <Input onChange={handleChange} id="filtro" name="filtro" type="Text" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input onChange={handleChange} id="selectMulti" name="selectMulti" type="select">
                {getData()}
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Label>{medicamento}</Label>
          <Button color="primary" onClick={() => { props.add(medicamento) }}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </ModalFooter>
      </Modal>
    </div>
  );
}
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      rxseleccionar: "",
      rxenmascarar: "",
      tipoboton: "",
      farmaco: [{ FARMACOS }],

    }
  }

  add(datos) {
   //el .split sirve para dividir un string en partes de uan array pasandole un parametro de separacion 
    let d = datos.split("|")
    if (this.state.tipoboton === "primary") {
      this.setState(prevState => ({ rxseleccionar: [...prevState.rxseleccionar, d[0]] }));
      this.toggleModal();
    } else if (this.state.tipoboton === "danger") {
      this.setState(prevState => ({ rxenmascarar: [...prevState.rxenmascarar, d[0]] }));
      this.toggleModal();
    }
  }
  vaciar1() {
    this.setState({ rxseleccionar: "" });
  }
  vaciar2() {
    this.setState({ rxenmascarar: "" });
  }
  toggleModal(tipoboton) {
    this.setState({ isOpen: !this.state.isOpen, tipoboton });
  }
  render() {
    return (
      <>
        <div>
          <UncontrolledAccordion
            defaultOpen={[
              '1'
            ]}
            stayOpen
          >
            <AccordionItem>
              <AccordionHeader targetId="1">
                GESTION DE FARMACOS
              </AccordionHeader>
              <AccordionBody accordionId="1">
                <Row>
                  <Col>
                    <Alert color="info">
                      Incluir X Medicamentos:
                      <Input type="textarea"
                        name="rxseleccionar"
                        value={this.state.rxseleccionar} />

                      <Button
                        onClick={() => { this.toggleModal("primary") }} color="info">Add
                      </Button>
                      {" "}
                      <Button color="info" onClick={() => this.vaciar1()}>Clear</Button>
                    </Alert>
                  </Col>
                  <Col>
                    <Alert color="danger">
                      Excluir X Medicamentos:
                      <Input 
                      type="textarea" 
                      name="rxenmascarar"
                      value={this.state.rxenmascarar} />
                      <Button
                      color="danger" onClick={() => { this.toggleModal("danger") }} >Add</Button>
                      {" "}
                      <Button color="danger" onClick={() => this.vaciar2()}>Clear</Button>
                    </Alert>
                  </Col>
                </Row>
              </AccordionBody>
            </AccordionItem>
          </UncontrolledAccordion>
        </div>
        <VentanaModalDiccionario

          add={(datos) => this.add(datos)}
          mostrar={this.state.isOpen}
          aceptar={"Añadir"}
          titulo={"Añadir farmacos"}

        />
        <br />
      </>
    );
  }
}
class App extends Component {
  render() {
    return (<div className="App">
      <Filter />
    </div>
    );
  }

}
export default App;
