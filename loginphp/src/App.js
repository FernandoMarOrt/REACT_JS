import logo from './logo.svg';
import './App.css';
import {Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppLogin from './componentes/AppLogin'
import Menu from './componentes/Menu'
import { Component, useState } from 'react';
import {PHPLOGIN} from './componentes/Datos';
import axios from 'axios';
import md5 from "md5";

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      menuItem:"UNO",
      logged:false,
      textoEscrito: "",
    }
  }
  
  changeMenu(item){
    this.setState({menuItem:item})
  }

  cambiarTexto(texto){
    this.setState({textoEscrito:texto})
  } 

  userLogin(telefono,password){
    /*
    if (telefono=="Myfpschool" && password=="2023"){
      this.setState({logged:true})
    }
    */
    axios.post(PHPLOGIN,JSON.stringify({
      telefono:telefono,
      password:password
    }))
    .then(res => {
      console.log(res.data.usuario);
      if ( res.data.usuario !== undefined){
        this.setState({logged:true});
      }
    })

  }

  render(){
    let obj=<><Menu 
     menuItem={this.state.menuItem}
     changeMenu={(item)=>this.changeMenu(item)} 
     textoEscrito={this.state.textoEscrito}
     cambiarTexto={(texto) => this.cambiarTexto(texto)}/></>
    if (!this.state.logged){
      obj=<AppLogin userLogin={(telefono,password)=>this.userLogin(telefono,password)}/>
    }
    return (
      <div className="App">
        {obj}
      </div>
    );
  }
}

export default App;
