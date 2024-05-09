import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import { EDITARESTADORESERVAS } from './datos';

function VistaAdmin({ peluqueros, dias, plantilla, onVolverClick, reservas }) {
  const [reservasGeneradas, setReservasGeneradas] = useState(false);
  const [reservasOcupadas, setReservasOcupadas] = useState([]);

  useEffect(() => {
    // Filtrar las reservas ocupadas
    const reservasFiltradas = reservas.filter(r => r.estado === "1");
    setReservasOcupadas(reservasFiltradas);
  }, [reservas]); // Actualizar cuando cambie el estado de las reservas

  const generarReservas = () => {
    // Lógica para generar las reservas
    // ...

    setReservasGeneradas(true);
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
        // Actualizar localmente las reservas después de la cancelación
        const reservasActualizadas = reservasOcupadas.filter(reserva => reserva.id_reserva !== id_reserva);
        setReservasOcupadas(reservasActualizadas);
      })
      .catch(error => {
        console.error('Error al cancelar reserva:', error);
      });
  };

  return (
    <div>
      <p>Vista del administrador</p>
      <div id='reservasOcupadas'>
        <p id='tituloOcupadas'>Reservas ocupadas</p>
        {reservasOcupadas.map(r => (
          <div key={r.id_reserva} className='cuerpoReserva'>
            <div>
              <p><b>Día:</b> {r.id_dias}</p>
              <p><b>Hora:</b> {r.hora}</p>
              <p><b>Peluquero:</b> {peluqueros.find(p => p.id_peluquero === r.id_peluquero).nombre}</p>
              <p><b>Nombre:</b> {r.nombre}</p>
              <p><b>Teléfono:</b> {r.telefono}</p>
              <div className='botonesAdmin'>
                <button className='boton cancelar' onClick={() => cancelarReserva(r.id_reserva)}>Cancelar</button>
                <button className='boton borrar'>Borrar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p>
        <Button onClick={generarReservas}>Generar Reserva</Button>
        {reservasGeneradas && <Alert color="success">Reserva realizada con éxito</Alert>}
      </p>
      <p>
        <Button onClick={onVolverClick}>Volver a la vista cliente</Button>
      </p>
    </div>
  );
}

export default VistaAdmin;
