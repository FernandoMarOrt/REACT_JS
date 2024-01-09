import React, { Component } from 'react';
import Flashcard from './componentes/FlashcardComponent';
import { GODOS  } from './shared/datos';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imagen: "/assets/images/yes.png"
    }
  }
  render() {
    const lista = GODOS.map(
      (rey)=> <Flashcard 
                key={rey.id}
                imagen={rey.imagen} 
                titulo={rey.nombre}
                texto={rey.texto}
              />
    );
    return (
      <div className="App">
        {lista}
      </div>
    );
  }
}

export default App;
