import React from 'react';
import { Button } from 'reactstrap';

// Función para generar todas las reservas posibles
function generarReservas(peluqueros, diasDisponibles, horario) {
  const reservas = [];
  peluqueros.map(peluquero => {
    diasDisponibles.map(dia => {
      horario.map(hora => {
        reservas.push({
          peluquero: peluquero.nombre,
          dia: dia,
          hora: hora
        });
      });
    });
  });
  return reservas;
}


function VistaAdmin({ peluqueros, diasDisponibles, horario, onVolverClick }) {
  const generarTodasLasReservas = () => {
    const reservas = generarReservas(peluqueros, diasDisponibles, horario);
    console.log("Reservas generadas:", reservas);
  };

  return (
    <div>
      <p>Vista del administrador</p>
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
