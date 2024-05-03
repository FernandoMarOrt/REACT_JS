import React, { useState } from 'react';
import { Button, Alert } from 'reactstrap';


function generarReservas(peluqueros, dias, plantilla) {
  const arraysDeHoras = separarHoras(plantilla); // Llamar a la función separarHoras

  let reservas = [];

  peluqueros.map(peluquero => {
    dias.map(dia => {
      arraysDeHoras.map((horas, id_plantilla) => {
        horas.map(hora => {
          reservas.push({
            id_Peluquero: peluquero.id_peluquero,
            id_Dia: dia.id_dias,
            hora: hora,
            estado: 0
          });
        });
      });
    });
  });

  return reservas;
}

function separarHoras(plantilla) {
  const arraysDeHoras = [];

  plantilla.map(p => {
    const horasSeparadas = p.hora.split(",");
    arraysDeHoras.push(horasSeparadas);
  });

  return arraysDeHoras;
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
      {reservasGeneradas && <Alert color="success">Reservas realizadas con exito</Alert>}
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
