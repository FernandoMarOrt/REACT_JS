import React from 'react';
import { Button } from 'reactstrap';

function generarReservas(peluqueros, dias, plantilla) {
  const arraysDeHoras2 = separarHoras(plantilla); // Llamar a la función separarHoras
}



function separarHoras(plantilla) {
  const arraysDeHoras = {};

  // Iterar sobre cada objeto de la plantilla
  plantilla.map(p => {
    // Verificar si ya existe un array para el id_plantilla actual
    if (!arraysDeHoras.hasOwnProperty(p.id_plantilla)) {
      arraysDeHoras[p.id_plantilla] = []; // Si no existe, crear un nuevo array
    }
    // Separar las horas por comas y agregarlas al array correspondiente
    const horasSeparadas = p.hora.split(",");
    arraysDeHoras[p.id_plantilla] = arraysDeHoras[p.id_plantilla].concat(horasSeparadas);
  });
  // Imprimir el objeto final
  console.log("Arrays de horas:", arraysDeHoras);

  return arraysDeHoras;
}



function VistaAdmin({ peluqueros, dias, plantilla, onVolverClick }) {
  console.log("Plantilla en VistaAdmin:", plantilla);
  const generarTodasLasReservas = () => {
    const reservas = generarReservas(peluqueros, dias, plantilla);
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
