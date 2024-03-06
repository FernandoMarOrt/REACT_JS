import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PISOS } from './componentes/pisos.js';
import { PISOSM } from './componentes/pisosmatriz.js';
import { PRECIOS } from './componentes/precios.js';
import './App.css';

const Formulario = () => {
  const [respuestas, setRespuestas] = useState([]);

  const asignarDatos = (event) => {
    event.preventDefault();

    let metros, habitaciones, baños, vistas, garaje, trastero, año, estado, piscina;

    if (event.target.name === 'metros') {
      metros = event.target.value;
    } else if (event.target.name === 'habitaciones') {
      habitaciones = event.target.value;
    } else if (event.target.name === 'baños') {
      baños = event.target.value;
    } else if (event.target.name === 'vistas') {
      vistas = event.target.value;
    } else if (event.target.name === 'garaje') {
      garaje = event.target.value
    } else if (event.target.name === 'trastero') {
      trastero = event.target.value 
    } else if (event.target.name === 'año') {
      año = event.target.value;
    } else if (event.target.name === 'estado') {
      estado = event.target.value;
    } else if (event.target.name === 'piscina') {
      piscina = event.target.value
    }

    
  };

  return (
    <div id='formulario'>
      <Form>
        <FormGroup>
          <Label for='metros'>Metros:</Label>
          <Input id='metros' name='metros' placeholder='Introduce los metros' type='number' onChange={asignarDatos} />
        </FormGroup>

        <FormGroup>
          <Label for='habitaciones'>Habitaciones:</Label>
          <Input
            id='habitaciones'
            name='habitaciones'
            placeholder='Introduce las habitaciones'
            type='number'
            onChange={asignarDatos}
          />
        </FormGroup>

        <FormGroup>
          <Label for='baños'>Baños:</Label>
          <Input id='baños' name='baños' placeholder='Introduce los baños' type='number' onChange={asignarDatos} />
        </FormGroup>

        <FormGroup tag='fieldset'>
          <legend>Vistas al mar</legend>
          <FormGroup check>
            <Input name='vistas' type='radio' value='Si' onChange={asignarDatos} />
            {' '}
            <Label check>Si</Label>
          </FormGroup>
          <FormGroup check>
            <Input name='vistas' type='radio' value='No' onChange={asignarDatos} />
            {' '}
            <Label check>No</Label>
          </FormGroup>
        </FormGroup>

        <FormGroup tag='fieldset'>
          <legend>Garaje</legend>
          <FormGroup check>
            <Input name='garaje' type='radio' value='Si' onChange={asignarDatos} />
            {' '}
            <Label check>Si</Label>
          </FormGroup>
          <FormGroup check>
            <Input name='garaje' type='radio' value='No' onChange={asignarDatos} />
            {' '}
            <Label check>No</Label>
          </FormGroup>
        </FormGroup>

        <FormGroup tag='fieldset'>
          <legend>Trastero</legend>
          <FormGroup check>
            <Input name='trastero' type='radio' value='Si' onChange={asignarDatos} />
            {' '}
            <Label check>Si</Label>
          </FormGroup>
          <FormGroup check>
            <Input name='trastero' type='radio' value='No' onChange={asignarDatos} />
            {' '}
            <Label check>No</Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for='año'>Año:</Label>
          <Input id='año' name='año' placeholder='Introduce el año de construcción' type='number' onChange={asignarDatos} />
        </FormGroup>

        <FormGroup>
          <Label for='estado'>Estado de la vivienda</Label>
          <Input id='estado' name='estado' type='select' onChange={asignarDatos}>
            <option value={1}>1 Desastroso</option>
            <option value={2}>2 Aceptable</option>
            <option value={3}>3 Buen estado</option>
            <option value={4}>4 Casi nuevos</option>
            <option value={5}>5 Nuevo</option>
          </Input>
        </FormGroup>

        <FormGroup tag='fieldset'>
          <legend>Piscina</legend>
          <FormGroup check>
            <Input name='piscina' type='radio' value='Si' onChange={asignarDatos} />
            {' '}
            <Label check>Si</Label>
          </FormGroup>
          <FormGroup check>
            <Input name='piscina' type='radio' value='No' onChange={asignarDatos} />
            {' '}
            <Label check>No</Label>
          </FormGroup>
        </FormGroup>

        <Button id='btnEnviar'>Enviar</Button>
      </Form>
    </div>
  );
};

export default Formulario;
