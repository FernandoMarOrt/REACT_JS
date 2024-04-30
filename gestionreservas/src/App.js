import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import user from './img/user.svg';
import Login from './componentes/login';
import Cliente from './componentes/vistacliente';
import Admin from './componentes/vistaadmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { PELUQUEROS } from './componentes/datosPeluqueros';
import { RESERVAS } from './componentes/datosReservas';
import { DIAS } from './componentes/datosDias';
import { PLANTILLA } from './componentes/datosPlantilla';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      vistaAdmin: false,
      info: "",
      usuarioActual: null,
      peluqueros: [],
      reservas: [],
      dias:[],
      plantilla:[],
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVolverClick = this.handleVolverClick.bind(this); // Función para volver a la vista cliente
  }

  componentDidMount() {
    axios.get(PELUQUEROS)
      .then(response => {
        this.setState({ peluqueros: response.data })
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

    axios.get(RESERVAS)
      .then(response => {
        this.setState({ reservas: response.data })
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

      axios.get(DIAS)
      .then(response => {
        this.setState({ dias: response.data })
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });

    axios.get(PLANTILLA)
      .then(response => {
        console.log(response.data);
        this.setState({ plantilla: response.data })
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

  handleVolverClick() { // Función para volver a la vista cliente
    this.setState({ vistaAdmin: false });
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
          {vistaAdmin ? <Admin onVolverClick={this.handleVolverClick} 
          peluqueros={this.state.peluqueros} 
          reservas={this.state.reservas}
          dias={this.state.dias} 
          plantilla={this.state.plantilla}/> : <Cliente peluqueros={this.state.peluqueros} reservas={this.state.reservas}/>}
        </main>
        <footer></footer>
      </div>
    );
  }
}

export default App;