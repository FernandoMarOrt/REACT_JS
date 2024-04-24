// Login.js
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';

function Login({ isOpen, toggle ,handleSubmit, info}) {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="usuario">Usuario</Label>
              <Input id="usuario" name="usuario" placeholder="Usuario" type="text" />
            </FormGroup>
            <FormGroup>
              <Label for="clave">Contraseña</Label>
              <Input id="clave" name="clave" placeholder="Contraseña" type="password" />
            </FormGroup>
            <Button color="primary">Login</Button>
          </Form>
          <p id='mensajeError'>{info}</p>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Login;
