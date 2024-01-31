import React, { Component } from 'react';
import { Button, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

function Botonera(props) {


  const posicion = (i,j) =>{

    console.log(i,j)
    let posicionI = i;
    let posicionJ = j;

    if(color === "secondary"){
      console
    }
   
  }

  //COMPONENTE QUE RENDERIZA EL TABLERO
  let tablero = [];
  for (let i = 0; i < props.paneldamas.length; i++) {

    const t = []
    for (let j = 0; j < props.paneldamas[i].length; j++) {

      if ((i  % 2 === 0 && j % 2 ===1) || (i  % 2 === 1 && j % 2 ===0) ) {
        if(i > 4){
          t.push(<Button color="success" onClick={() => posicion(i,j,color)}/>)
        }else{
          t.push(<Button color="secondary" onClick={() => posicion(i,j)}/>)
        }
     
      }else{
        t.push(<Button outline/>)
      }
     
      
    }
    tablero.push(<Row><Col>{t}</Col></Row>)
  }

  return (<>{tablero}</>)

}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tablero: []

    };
  }

  componentWillMount() {
    //ESTE MÉTODO SE EJECUTARÁ AL PRINCIPIO DE LA APLICACIÓN. ANTES DE RENDERIZAR.

    let t = []
    for (let i = 0; i < 8; i++) {
      let fila = []
      for (let j = 0; j < 8; j++) {
        fila.push("secondary")
      }
      t.push(fila)
    }
    this.setState({ tablero: t })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Botonera paneldamas={this.state.tablero}/>
        </header>
      </div>
    );
  }
}
export default App;