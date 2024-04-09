import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./App.css"

function Botonera ({ tablero, seleccionado, handleClickSeleccion }) {
  const vistaTablero = tablero.map((fila, indexFila) => {
    const filaAux = fila.map((col, indexCol) => {
      let boton
      switch (col) {
        case 'verde':
          boton = (seleccionado && seleccionado.posY === indexFila && seleccionado.posX === indexCol) ? <Button color='success' active onClick={() => handleClickSeleccion(indexCol, indexFila)} /> : <Button color='success' onClick={() => handleClickSeleccion(indexCol, indexFila)} />
          return boton
        case 'gris':
          boton = (seleccionado && seleccionado.posY === indexFila && seleccionado.posX === indexCol) ? <Button color='secondary' active onClick={() => handleClickSeleccion(indexCol, indexFila)} /> : <Button color='secondary' onClick={() => handleClickSeleccion(indexCol, indexFila)} />
          return boton
        default:
          return <Button outline onClick={() => handleClickSeleccion(indexCol, indexFila)} />
      }
    })
    filaAux.push(<br/>)
    return filaAux
  })

  return (
  <div className='tablero'>
    {vistaTablero}
  </div>
  )
}

function App () {
  const [tablero, setTablero] = useState([])
  const [seleccionado, setSeleccionado] = useState()

  // useEffect para crear el tablero al iniciar el programa
  useEffect(() => {
    const tamanioAltura = 8
    const tamanioAncho = 8
    const tableroAux = []
    let color = ''
    for (let i = 0; i < tamanioAltura; i++) {
      tableroAux.push([])
      for (let j = 0; j < tamanioAncho; j++) {
        if (i < 4) {
          color = 'gris'
        } else if (i > 3) { //poner a 3 si se quiere rellenar
          color = 'verde'
        } else {
          color = 'blanco'
        }
        if (i % 2 === 0 && j % 2 === 0) {
          color = 'blanco'
        } else if (i % 2 !== 0 && j % 2 !== 0) {
          color = 'blanco'
        }
        tableroAux[i].push(color)
      }
    }

    setTablero(tableroAux)
  }, [])

  function handleClickSeleccion (posX, posY) {
    if (!seleccionado) {
      setSeleccionado({ posX, posY })
    } else {
      mover(posX, posY)
      setSeleccionado(undefined)
    }
  }

  function mover (posX, posY) {
    // Si hay alguno seleccionado
    if (seleccionado) {
      const tableroAux = JSON.parse(JSON.stringify(tablero))
      switch (tablero[seleccionado.posY][seleccionado.posX]) {
        case 'verde':
          if (comprobarMovimiento('verde', posX, posY)) {
            tableroAux[seleccionado.posY][seleccionado.posX] = 'blanco'
            tableroAux[posY][posX] = 'verde'
          }
          break
        case 'gris':
          if (comprobarMovimiento('gris', posX, posY)) {
            tableroAux[seleccionado.posY][seleccionado.posX] = 'blanco'
            tableroAux[posY][posX] = 'gris'
          }
          break
        default:
          break
      }
      setTablero(tableroAux)
    }
  }

  function comprobarMovimiento (color, posX, posY) {
    switch (color) {
      case 'verde':
        return seleccionado.posY - posY === 1 && (seleccionado.posX - posX === 1 || seleccionado.posX - posX === -1) && tablero[posY][posX] !== 'verde'
      case 'gris':
        return seleccionado.posY - posY === -1 && (seleccionado.posX - posX ===1 || seleccionado.posX - posX === -1) && tablero[posY][posX] !== 'gris'
      default:
        return false
    }
  }

  return (
  <div className="App">
    <header className="App-header">
      <Botonera tablero={tablero} seleccionado={seleccionado} handleClickSeleccion={handleClickSeleccion} />
    </header>
  </div>
  )
}
export default App
