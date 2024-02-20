import React, { Component, useState } from "react";
import { Button} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


const Mapa = (props) => {
  const tablero = [];
 
  for (let i = 0; i < props.mapa.length; i++) {
    const fila = props.mapa[i];
    const celdas = [];

    for (let j = 0; j < fila.length; j++) {
      celdas.push(
        <td key={j}  >
          <Button  onClick={() => props.agregar(i,j)}  style={{backgroundColor:"white", color: "black"}}>{fila[j]}</Button>
        </td>
      );
    }

    tablero.push(<tr key={i}>{celdas}</tr>);
  }

  return (
    <div>
      <h1>Mapa poblacion</h1>
      <table>
      <tbody>{tablero}</tbody>
    </table>
    </div>
    
  );
}


const ListaSupermercados = (props) => {
  return (
    <div>
      <h1>Lista de Supermercados</h1>
      <ul>
        {props.listaSuper.map((supermercado, index) => (
          <li key={index}>
            Supermercado en ({supermercado.i}, {supermercado.j})
          </li>
        ))}
      </ul>
    </div>
  );
};



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      poblacion: [
        [0, 5, 4, 2, 9, 8, 0, 8, 8],
        [1, 7, 21, 23, 44, 5, 3, 4, 0],
        [2, 6, 32, 22, 33, 8, 4, 2, 8],
        [1, 2, 43, 4, 56, 65, 34, 11, 8],
        [2, 22, 32, 3, 42, 62, 43, 21, 0],
        [2, 2, 23, 34, 64, 24, 42, 15, 7],
        [0, 2, 36, 43, 61, 26, 64, 12, 0],
        [1, 2, 15, 43, 34, 2, 12, 2, 3],
        [1, 0, 12, 3, 0, 0, 21, 2, 2]
      ],
      supermercados: [],
    };
  }

  agregarSupermercado = (i,j) => {
    let copiaSuper = this.state.supermercados
    let superRepetido = copiaSuper.find(s=> s.i === i && s.j ===j)

    if(superRepetido){

      console.log("Ya tienes este supermercado")

    }else{

      copiaSuper.push({ i, j});
      this.setState({supermercados: copiaSuper });
    }
    console.log(copiaSuper.map(e=>e))
  };

  render() {

    return (
      <div>
        <Mapa 
        mapa={this.state.poblacion}
        agregar={(i,j) => this.agregarSupermercado(i,j)}
        ></Mapa>

        <ListaSupermercados
        listaSuper = {this.state.supermercados}
        ></ListaSupermercados>

      </div>
    );
  }
}

export default App;
