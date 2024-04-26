import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import user from './img/user.svg';
import Login from './componentes/login';
import Admin from './componentes/vistaadmin';
import Cliente from './componentes/vistacliente';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {PELUQUEROS} from './componentes/datosPeluqueros';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      vistaAdmin: false,
      info: "",
      usuarioActual: null,
      peluqueros:[],


    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(PELUQUEROS)
      .then(response => {
        console.log(response.data);
        this.setState({peluqueros : response.data})
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    const sendUserId = event.target.usuario.value;
    const sendUserPsw = event.target.clave.value;

    const loggedInUser = this.checkLogin(sendUserId, sendUserPsw);

    if (loggedInUser) {
      this.setState({
        usuarioActual: loggedInUser,
        info: "",
        vistaAdmin: true
      });
      this.toggle();
    }
  }

  checkLogin(idToCheck, pswToCheck) {
    const usuarios = [
      { userId: "admin", password: "1234" }
    ];

    if (idToCheck && pswToCheck) {
      const foundUser = usuarios.find(user => user.userId === idToCheck && user.password === pswToCheck);
      if (foundUser) {
        return foundUser;
      } else {
        this.setState({ info: "*El usuario o la contraseña no son correctos*" });
        return null;
      }
    } else {
      this.setState({ info: "*Completa todos los campos por favor*" });
      return null;
    }
  }

  render() {
    const { modal, vistaAdmin, info } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Gestion Reservas</h1>
          <img src={user} id="user" alt="user" onClick={this.toggle} />
        </header>
        <main>
          <Login isOpen={modal} toggle={this.toggle} handleSubmit={this.handleSubmit} info={info} />
          {vistaAdmin ? <Admin /> : <Cliente peluqueros={this.state.peluqueros}/>}
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;
