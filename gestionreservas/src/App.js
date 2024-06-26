import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import user from './img/user.svg';
import Login from './componentes/login';
import Cliente from './componentes/vistacliente';
import Admin from './componentes/vistaadmin';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { PELUQUEROS, RESERVAS, DIAS, PLANTILLA } from './componentes/datos';
import './App.css';

class App extends Component {
  state = {
    modal: false,
    vistaAdmin: false,
    info: "",
    usuarioActual: null,
    peluqueros: [],
    reservas: [],
    dias: [],
    plantilla: [],
    fechaActual: new Date(),
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  //Envio datos del formulario de login
  handleSubmit = (event) => {
    event.preventDefault();
    const sendUserId = event.target.usuario.value;
    const sendUserPass = event.target.clave.value;
    const loggedInUser = this.comprobarLogin(sendUserId, sendUserPass);
    if (loggedInUser) {
      this.setState({
        usuarioActual: loggedInUser,
        info: "",
        vistaAdmin: true
      });
      this.toggle();
    }
  }

  //Compruebo si se ha logeado
  comprobarLogin = (idUsu, passUsu) => {
    const usuarios = [{ userId: "admin", password: "1234" }];
    if (idUsu && passUsu) {
      const encontrado = usuarios.find(user => user.userId === idUsu && user.password === passUsu);
      if (encontrado) {
        return encontrado;
      } else {
        this.setState({ info: "*El usuario o la contraseña no son correctos*" });
        return null;
      }
    } else {
      this.setState({ info: "*Completa todos los campos por favor*" });
      return null;
    }
  }

  //Llamo a la funcion para obtener todos los datos
  componentDidMount() {
    this.obtenerDatos();
  }

  //Obtengo todos los datos
  obtenerDatos = () => {
    axios.get(PELUQUEROS)
      .then(response => {
        this.setState({ peluqueros: response.data })
      })
      .catch(error => {
        console.error('Error fetching peluqueros: ', error);
      });

    axios.get(RESERVAS)
      .then(response => {
        this.setState({ reservas: response.data })
      })
      .catch(error => {
        console.error('Error fetching reservas: ', error);
      });

    axios.get(DIAS)
      .then(response => {
        this.setState({ dias: response.data })
      })
      .catch(error => {
        console.error('Error fetching dias: ', error);
      });

    axios.get(PLANTILLA)
      .then(response => {
        this.setState({ plantilla: response.data })
      })
      .catch(error => {
        console.error('Error fetching plantilla: ', error);
      });
  }

  //Vuelve a obtener las reservas al hacer clic en volver a la vista cliente desde vista admin
  handleVolverClick = () => {
    this.obtenerDatos(); 
    this.setState({ vistaAdmin: false });
  }

  render() {
    const { modal, vistaAdmin, info } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Gestion Reservas</h1>
          {!vistaAdmin && <img src={user} id="user" alt="user" onClick={this.toggle} />}
        </header>
        <main>
          {!vistaAdmin && <Login isOpen={modal} toggle={this.toggle} handleSubmit={this.handleSubmit} info={info} />}
          {vistaAdmin ? <Admin onVolverClick={this.handleVolverClick} peluqueros={this.state.peluqueros} reservas={this.state.reservas} dias={this.state.dias} plantilla={this.state.plantilla} /> :
            <Cliente peluqueros={this.state.peluqueros} reservas={this.state.reservas} dias={this.state.dias} fetchReservas={this.obtenerDatos} fechaActual={this.state.fechaActual}/>}
        </main>
        <footer></footer>
      </div>
    );
  }
  
}

export default App;
