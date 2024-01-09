import React from 'react';
import { Button } from 'reactstrap';

const Tablero = (props) => {
  // Crear una matriz de 10x10
  const matriz = Array.from({ length: props.filas }, () => Array(props.columnas).fill(null));

  //Funcion para obtener un numero aleatorio
  const numeroAlea = (max) => {
    return Math.floor(Math.random() * max);
  }

  const obtenerColorFondo = (fila, columna) => {
    return fila === props.localizadorX && columna === props.localizadorY ? 'red' : 'white';
  };

  const ponerMinas = () => {
    let minas = 0;
    while (minas !== props.contador) {
      let i = numeroAlea(props.filas);
      let j = numeroAlea(props.columnas);
      if ((i === 0 && j === 0) || (i === props.filas - 1 && j === props.columnas - 1)) {
        // Evitar colocar minas en la posición inicial y final
      } else if (!matriz[i][j]) {
        minas++;
        matriz[i][j] = 'X';
      }
    }
  }

  ponerMinas(); // Llama a ponerMinas directamente después de la creación de la matriz

  return (
    <div className="tableroJuego">
      <h2>TABLERO DE JUEGO</h2>
      <p>POSICION DEL JUGADOR: {props.localizadorX}, {props.localizadorY}</p>
      <table>
        {matriz.map((fila, filaIndex) => (
          <tr key={filaIndex}>
            {fila.map((col, columnaInd) => (
              <td key={columnaInd}>
                {col === 'X' ? (
                  <Button style={{ backgroundColor: obtenerColorFondo(filaIndex, columnaInd) }}>X</Button>
                ) : (
                  <Button style={{ backgroundColor: obtenerColorFondo(filaIndex, columnaInd) }}>P</Button>
                )}
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
};
//X es la mina
//P es el jugador

export default Tablero;

