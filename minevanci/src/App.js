import React, { Component } from 'react';
import Selector from './componentes/selectorMinas';
import Panelcontrol from './componentes/control';
import Tablero from './componentes/tablero';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filas: 10,
      columnas: 10,
      minas: 0,
      posicionX: 0,
      posicionY: 0,
    }
  }

  aumentar() {
    if (this.state.minas < 10) {
      let n = this.state.minas + 1
      this.setState({ minas: n })
    }
  }

  disminuir() {
    if (this.state.minas > 1) {
      let n = this.state.minas - 1
      this.setState({ minas: n })
    }
  }

  moverArriba() {
    if (this.state.posicionX > 0) {
      let n = this.state.posicionX - 1
      this.setState({ posicionX: n })
    }
  }

  moverAbajo() {
    if (this.state.posicionX < this.state.filas-1) {
      let n = this.state.posicionX + 1
      this.setState({ posicionX: n })
    }
  }

  moverIzquierda() {
    if (this.state.posicionY > 0) {
      let n = this.state.posicionY - 1
      this.setState({ posicionY: n })
    }
  }

  moverDerecha() {
    if (this.state.posicionY < this.state.columnas-1) {
      let n = this.state.posicionY + 1
      this.setState({ posicionY: n })
    }
  }

  render() {
    return (
      <div className="App">
        <div>
          <Selector
            contador={this.state.minas}
            pulsarAumentar={() => this.aumentar()}
            pulsarDisminuir={() => this.disminuir()}
          />
        </div>

        <div>
          <Panelcontrol
            localizadorX={this.state.posicionX}
            localizadorY={this.state.posicionY}
            arriba={() => this.moverArriba()}
            abajo={() => this.moverAbajo()}
            izquierda={() => this.moverIzquierda()}
            derecha={() => this.moverDerecha()}
          />
        </div>

        <div>
          <Tablero
          filas={this.state.filas}
          columnas={this.state.columnas}
          localizadorX={this.state.posicionX}
          localizadorY={this.state.posicionY}
          contador={this.state.minas}
          />
        </div>
      </div>
    );
  }
}

export default App;



