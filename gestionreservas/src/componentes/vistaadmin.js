import React, { useState } from 'react';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import { INSERTARRESERVAS } from './datos';

function generarReservas(peluqueros, dias, plantilla) {
  const arraysDeHoras = separarHoras(plantilla); // Separo las horas
  console.log(arraysDeHoras);
  let reserva = null;

  for (let i = 0; i < peluqueros.length; i++) {
    const peluquero = peluqueros[i];
    const horasDelPeluquero = arraysDeHoras[i];

    for (const dia of dias) {
      for (const hora of horasDelPeluquero) {
        // Crear la reserva
        reserva = {
          id_peluquero: peluquero.id_peluquero,
          id_dias: dia.id_dias,
          hora: hora,
          estado: 0
        };

        // Insertar la reserva en la base de datos
        generarReserva(reserva.id_peluquero, reserva.id_dias, reserva.hora, reserva.estado);

        //Para que solo inserte 1 *QUITAR PARA QUE SE GENEREN TODAS*
        if (reserva) {
          return reserva;
        }
      }
    }
  }

  return reserva;
}


function generarReserva(id_peluquero, id_dia, hora, estado) {
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
}

function separarHoras(plantilla) {
  return plantilla.map(p => p.hora.split(","));
}

function VistaAdmin({ peluqueros, dias, plantilla, onVolverClick,reservas }) {
  const [reservasGeneradas, setReservasGeneradas] = useState(false);

  const generarTodasLasReservas = () => {
    const reservas = generarReservas(peluqueros, dias, plantilla);
    console.log("Reservas generadas:", reservas);
    setReservasGeneradas(true);
  };

  return (
    <div>
      <p>Vista del administrador</p>
      <div id='reservasOcupadas'>
        <p id='tituloOcupadas'>Reservas ocupadas</p>
        {reservas.filter(r => r.estado === "1").map(r => ( //Para mostrar las reservas que no están ocupadas y pertenecen al día seleccionado
              <div key={r.id_reserva} className='cuerpoReserva'>
                <div>
                  <p><b>Día:</b> {r.id_dias}</p>
                  <p><b>Hora:</b> {r.hora}</p>
                  <p><b>Nombre:</b> {r.nombre}</p>
                  <p><b>Telfono:</b> {r.telefono}</p>
                  <div className='botonesAdmin'>
                  <Button color='success' className='cancelarReserva'>Cancelar</Button>
                  <Button color='danger' className='borrarReserva'>Borrar</Button>
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
