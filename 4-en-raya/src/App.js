import React, { Component } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Mostrar todo el tablero colocando los botones
const MapaBotones = (props) => {
  let lista = [];
  for (let i = 0; i < 9; i++) {
    let lista2 = [];
    for (let j = 0; j < 9; j++) {
      if (props.listaBotones[i][j] === "-") {
        lista2.push(<Button className='boton' key={i * 10 + j} outline onClick={() => props.clica(i, j)} />)
      } else {
        lista2.push(<Button className='boton' key={i * 10 + j} color={props.listaBotones[i][j]} />)
      }
    }
    lista2.push(<br />)
    lista.push(lista2)
  }
  return (lista);
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaBotones: Array(9).fill(null),
      listaColores: ["primary", "danger"],
      titulo: "Azules",
      turno: true,
      jugable: true,
      ganador: "",
    }
  }

  findPos(y) {
    let l = this.state.listaBotones;
    for (let i = 0; i < 9; i++) {
      if (l[i][y] != "-") return i - 1;
    }
    return 8;
  }


  clica(x, y) {
    if (!this.state.jugable) return;
    if (x !== 0) return;

    let l = this.state.listaBotones;
    let p = this.findPos(y);

    if (p >= 0) {
      if (this.state.turno) {
        l[p][y] = this.state.listaColores[0]
      } else {
        l[p][y] = this.state.listaColores[1]
      }
    }
    let titulo = "Azules";
    if (this.state.turno) titulo = "Rojos"

    this.setState({ listaBotones: l, turno: !this.state.turno, titulo: titulo })
    this.checkWinner();
  }

  // Comprobar el ganador 
  checkWinner() {
    let l = this.state.listaBotones;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9 - 3; j++) {
        if (l[i][j] != "-" && l[i][j] == l[i][j + 1] && l[i][j] == l[i][j + 2] && l[i][j] == l[i][j + 3]) {
          if (l[i][j] == "primary") {
            this.setState({ ganador: "Ganan los azules", jugable: false });
          } else {
            this.setState({ ganador: "Ganan los rojos", jugable: false });
          }
        }
      }
    }
    for (let i = 0; i < 9 - 3; i++) {
      for (let j = 0; j < 9; j++) {
        if (l[i][j] != "-" && l[i][j] == l[i + 1][j] && l[i][j] == l[i + 2][j] && l[i][j] == l[i + 3][j]) {
          if (l[i][j] == "primary") {
            this.setState({ ganador: "GANAN LOS AZULES", jugable: false });
          } else {
            this.setState({ ganador: "GANAN LOS ROJOS", jugable: false });
          }
        }
      }
    }
  }

  // Antes de renderizarse
  componentWillMount() {
    let l = this.state.listaBotones;
    for (let i = 0; i < l.length; i++) {
      let x = Array(9).fill("-");
      l[i] = x;
    }
    this.setState({ listaBotones: l })
  }

  
  render() {
    return (
      <div className="App">
        <h1 className='titulo'> Turno: {this.state.titulo}</h1>
        <h1 className={this.state.titulo}>{this.state.ganado}</h1>
        <div>
          <MapaBotones listaBotones={this.state.listaBotones} clica={(x, y) => this.clica(x, y)}/>
        </div>
        
      </div>
    );
  }
}
export default App;