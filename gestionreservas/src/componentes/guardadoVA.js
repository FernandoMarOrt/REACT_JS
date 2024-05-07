import React, { useState } from 'react';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import { INSERTARRESERVAS } from './datos';

function generarReservas(peluqueros, dias, plantilla) {
  const arraysDeHoras = separarHoras(plantilla); //Separo las horas
  console.log(arraysDeHoras)
  let reservas = [];

  peluqueros.forEach((peluquero, index) => {
    const horasDelPeluquero = arraysDeHoras[index]; //Horas del peluquero

    dias.forEach(dia => {
      horasDelPeluquero.forEach(hora => {
        // Crear la reserva
        const reserva = {
          id_peluquero: peluquero.id_peluquero,
          id_dia: dia.id_dias,
          hora: hora,
          estado: 0
        };
        reservas.push(reserva);
        
        // Insertar la reserva en la base de datos
        generarReserva(reserva.id_peluquero, reserva.id_dia, reserva.hora, reserva.estado);
      });
    });
  });

  return reservas;
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

function VistaAdmin({ peluqueros, dias, plantilla, onVolverClick }) {
  const [reservasGeneradas, setReservasGeneradas] = useState(false);

  const generarTodasLasReservas = () => {
    const reservas = generarReservas(peluqueros, dias, plantilla);
    console.log("Reservas generadas:", reservas);
    setReservasGeneradas(true);
  };

  return (
    <div>
      <p>Vista del administrador</p>
      {reservasGeneradas && <Alert color="success">Reservas realizadas con éxito</Alert>}
      <p>
        <Button onClick={generarTodasLasReservas}>Generar Reservas</Button>
      </p>
      <p>
        <Button onClick={onVolverClick}>Volver a la vista cliente</Button>
      </p>
    </div>
  );
}

export default VistaAdmin;