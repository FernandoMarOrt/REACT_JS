import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';

// Renderizar el tablero ya con la base hecha
function Botonera({ matriz }) {
  
  // recorro la matriz para ir rellenandola con los botones
  const tablero = matriz.map((fila, ind) => {
    
    // por cada fila devuelvo el boton que toca
    const auxFila = fila.map((pz) => {

      // dependiendo si es par o impar pongo el boton blanco antes o después
      if (ind % 2 === 0) {  // btnBlanco btnGris    si no   btnBlanco btnVerde
        const boton = pz === 'verde' ? <><Button outline /><Button color='secondary' /></> : <><Button outline /><Button color='success' /></>
        return boton
      } else {              // btnGris btnBlanco    si no   btnVerde btnBlanco
        const boton = pz === 'verde' ? <><Button color='secondary' /><Button outline /></> : <><Button color='success' /><Button outline /></>
        return boton
      }

    })

    return <>{auxFila}<br /></>
  })

  return (
    <div className='tablero'>
      {tablero}
    </div>
  )
}


function App() {

  const [tablero, setTablero] = useState([])

  // Creo la base de la matriz  || Se ejecuta antes de renderizar toda la APP
  useEffect(() => {

    const auxMat = []

    for (let i = 0; i < 8; i++) {
      auxMat.push([])

      for (let j = 0; j < 4; j++) { // Son 4 pq solo juegan 4 en cada fila
        // Mitad verde mitad gris
        if (i < 4) {
          auxMat[i].push('verde')
        } else {
          auxMat[i].push('gris')
        }

      }
    }

    setTablero(auxMat)

  }, [])


  return (
    <div className="App">
      <h1>Mostrar las damas</h1>
      <Botonera matriz={tablero} />
    </div>
  )
}
export default App