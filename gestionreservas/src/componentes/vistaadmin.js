import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import { INSERTARRESERVAS } from './datos';
import { EDITARESTADORESERVAS } from './datos';

function VistaAdmin({ peluqueros, dias, plantilla, onVolverClick, reservas }) {
  const [reservasGeneradas, setReservasGeneradas] = useState(false);
  const [reservasActualizadas, setReservasActualizadas] = useState([]);

  useEffect(() => {
    setReservasActualizadas(reservas.filter(r => r.estado === "1"));
  }, [reservas]);

  const generarReserva = (id_peluquero, id_dia, hora, estado) => {
    axios.post(INSERTARRESERVAS, {
      id_peluquero: id_peluquero,
      id_dia: id_dia,
      hora: hora,
      estado: estado,
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.error('Error al insertar reserva:', error);
    });
  };
  const cancelarReserva = (id_reserva) => {
    const datosActualizar = {
      id_reserva: id_reserva,
      nombre: "",
      telefono: "",
      estado: 0
    };
  
    axios.put(EDITARESTADORESERVAS, datosActualizar)
      .then(response => {
        console.log('Reserva cancelada con éxito:', response.data);
        setReservasActualizadas(reservasActualizadas.filter(r => r.id_reserva !== id_reserva));
      })
      .catch(error => {
        console.error('Error al cancelar reserva:', error);
      });
  };
  

  const generarTodasLasReservas = () => {
    const arraysDeHoras = separarHoras(plantilla); // Separo las horas
    console.log(arraysDeHoras);

    for (let i = 0; i < peluqueros.length; i++) {
      const peluquero = peluqueros[i];
      const horasDelPeluquero = arraysDeHoras[i];

      for (const dia of dias) {
        for (const hora of horasDelPeluquero) {
          // Crear la reserva
          generarReserva(peluquero.id_peluquero, dia.id_dias, hora, 0);
        }
      }
    }

    setReservasGeneradas(true);
  };

  const nombrePeluquero = (id_peluquero) => {
    const peluquero = peluqueros.find(p => p.id_peluquero === id_peluquero);
    return peluquero ? peluquero.nombre : 'Desconocido';
  };

  const separarHoras = (plantilla) => {
    return plantilla.map(p => p.hora.split(","));
  };

  return (
    <div>
      <p>Vista del administrador</p>
      <div id='reservasOcupadas'>
        <p id='tituloOcupadas'>Reservas ocupadas</p>
        {reservasActualizadas.map(r => (
          <div key={r.id_reserva} className='cuerpoReserva'>
            <div>
              <p><b>Día:</b> {r.id_dias}</p>
              <p><b>Hora:</b> {r.hora}</p>
              <p><b>Nombre:</b> {r.nombre}</p>
              <p><b>Telfono:</b> {r.telefono}</p>
              <p><b>Peluquero:</b> {nombrePeluquero(r.id_peluquero)}</p>
              <div className='botonesAdmin'>
                <button className='boton cancelar' onClick={() => cancelarReserva(r.id_reserva)}>Cancelar</button>
                <button className='boton borrar'>Borrar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p>
        <Button onClick={generarTodasLasReservas}>Generar Reserva</Button>
        {reservasGeneradas && <Alert color="success">Reserva realizada con éxito</Alert>}
      </p>
      <p>
        <Button onClick={onVolverClick}>Volver a la vista cliente</Button>
      </p>
    </div>
  );
}

export default VistaAdmin;
