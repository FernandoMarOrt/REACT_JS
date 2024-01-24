import React, { useState, Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Alert, Row, Col, UncontrolledAccordion, AccordionItem, AccordionHeader, AccordionBody, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label
} from 'reactstrap';

const VentanaModalDiccionario = (props) => {
  const { className, medicamento, updateMedicamento } = props;

  const handleChange = (event) => {
    let medicamentoSelec = document.getElementById("selectMulti").value;
    updateMedicamento(medicamentoSelec);
  }

  return (
    <div>
      <Modal isOpen={props.mostrar} toggle={props.toggle} className={className} onEntering={"//ESTO SE EJECUTA CUANDO MUESTRAS LA VENTANA"}>
        <ModalHeader toggle={props.toggle}>{props.titulo}</ModalHeader>
        <ModalBody>
          <FormGroup row>
            <Label sm={2} > Filtrar: </Label>
            <Col sm={10}>
              <Input onChange={handleChange}
                id="filtro"
                name="filtro"
                type="Text" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input onChange={handleChange} onClick={handleChange}
                id="selectMulti"
                name="selectMulti"
                type="select"
              >
                <option>CODIGO1|DESCRIPCION1</option>
                <option>CODIGO2|DESCRIPCION2</option>
                <option>CODIGO3|DESCRIPCION3</option>
                <option>CODIGO4|DESCRIPCION4</option>
                <option>CODIGO5|DESCRIPCION5</option>
              </Input>
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          {medicamento}<Button color="primary" onClick={props.add}>{props.aceptar}</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
      medicamento: "",
    }
  }

  toggleModal() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  updateMedicamento = (medicamentoSelec) => {
    this.setState({ medicamento: medicamentoSelec });
  }

  add(datos) {
    //aquí hacer algo con los datos
    this.toggleModal();
  }

  render() {
    return <>
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
                    <Input type="textarea" name="rxseleccionar" />
                    <Button color="info" onClick={() => { this.toggleModal() }}>Add</Button>
                    {" "}<Button color="info" onClick={""}>Clear</Button>
                  </Alert>
                </Col>
                <Col>
                  <Alert color="danger">
                    Excluir X Medicamentos:
                    <Input type="textarea" name="rxenmascarar" />
                    <Button color="danger" onClick={() => { this.toggleModal() }}>Add</Button>
                    {" "}<Button color="danger" onClick={""}>Clear</Button>
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
        titulo={"VENTANA MODAL"}
        medicamento={this.state.medicamento}
        updateMedicamento={this.updateMedicamento}
      />
      <br />
    </>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Filter />
      </div>
    );
  }
}

export default App;
