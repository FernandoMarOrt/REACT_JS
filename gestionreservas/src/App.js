import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import user from './img/user.svg';
import Login from './componentes/login';
import Admin from './componentes/vistaadmin';
import Cliente from './componentes/vistacliente';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  // Ventana modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);


  //Vista actual
  const [vistaAdmin, setvistaAdmin] = useState(false);

  //Mensaje de error del login
  const [info, setInfo] = useState("");

  //Usuario que esta logueado 
  const [usuarioActual, setusuarioActual] = useState(null);

  // Usuario admin
  const usuarios = [
    { userId: "admin", password: "1234" }
  ];

  function handleSubmit(event) {
    event.preventDefault();

    const sendUserId = event.target.usuario.value;
    const sendUserPsw = event.target.clave.value;

    const loggedInUser = checkLogin(sendUserId, sendUserPsw);

    if (loggedInUser) {
      setusuarioActual(loggedInUser);
      setInfo("");
      setvistaAdmin(true);
      toggle();
    }
  }

  function checkLogin(idToCheck, pswToCheck) {
    if (idToCheck && pswToCheck) {
      const foundUser = usuarios.find(user => user.userId === idToCheck && user.password === pswToCheck);
      if (foundUser) {
        return foundUser;
      } else {
        setInfo("*El usuario o la contraseña no son correctos*");
        return null;
      }
    } else {
      setInfo("*Completa todos los campos por favor*");
      return null;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Gestion Reservas</h1>
        <img src={user} id="user" alt="user" onClick={toggle} />
      </header>
      <main>
        <Login isOpen={modal} toggle={toggle} handleSubmit={handleSubmit} info={info} />
        {vistaAdmin ? <Admin/> : <Cliente/> }
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
