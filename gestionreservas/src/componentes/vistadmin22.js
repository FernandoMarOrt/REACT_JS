import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'reactstrap';
import axios from 'axios';
import { INSERTARRESERVAS, EDITARESTADORESERVAS, BORRARRESERBAS } from './datos';

function VistaAdmin({ peluqueros, dias, plantilla, onVolverClick, reservas }) {
  const [reservasGeneradas, setReservasGeneradas] = useState(false);
  const [reservasActualizadas, setReservasActualizadas] = useState([]);
  const [borrarAlert, setBorrarAlert] = useState(false);
  const [cancelarAlert, setCancelarAlert] = useState(false);
  const [reservasRegistradas, setReservasRegistradas] = useState(new Set());
  const [MesSeleccionado, setMesSeleccionado] = useState("");
  const [meses, setMeses] = useState([]);
  const [mesActual, setmesActual] = useState(0);

  useEffect(() => {
    // Filtrar reservas y actualizar estado
    setReservasActualizadas(reservas.filter(r => r.estado === "1"));
    const mesActual = new Date().getMonth();
    setmesActual(mesActual);
    const meses = getNombreMeses();
    setMeses(meses);
    setMesSeleccionado(meses[mesActual]); //El mes actual lo pongo como predeterminado
  }, [reservas]);
  

  //Genero las reservas de una en una
  const generarReserva = (id_peluquero, id_dia, hora, estado, mes) => {
    axios.post(INSERTARRESERVAS, {
      id_peluquero: id_peluquero,
      id_dia: id_dia,
      hora: hora,
      estado: estado,
      mes: mes
    })
      .then(res => {
        console.log(res.data);
        const nuevaReserva = `${id_peluquero}-${id_dia}-${hora}-${mes}`;
        setReservasRegistradas(prevReservas => new Set(prevReservas.add(nuevaReserva)));
      })
      .catch(error => {
        console.error('Error al insertar reserva:', error);
      });
  };


  //Cojo el valor del mes
  const handleSelectChange = (event) => {
    setMesSeleccionado(event.target.value);
  };

  //Genero las reservas por mes
  const generarReservasPorMes = () => {
    const mesActual = new Date().getMonth();
    const currentDate = new Date().getDate();
  
    const selectedmeses = meses.slice(mesActual); // Obtener los meses desde el mes actual hasta diciembre
  
    const arraysDeHoras = separarHoras(plantilla);
  
    for (let i = 0; i < peluqueros.length; i++) {
      const peluquero = peluqueros[i];
      const horasDelPeluquero = arraysDeHoras[i];
      let diasParaGenerar = dias;
  
      // Si el mes seleccionado es el mes actual entonces empiezo a generar reservas desde el día actual
      if (MesSeleccionado === meses[mesActual]) {
        diasParaGenerar = dias.filter(dia => parseInt(dia.id_dias) >= currentDate);
      }
  
      for (const dia of diasParaGenerar) {
        for (const hora of horasDelPeluquero) {
          if (selectedmeses.includes(MesSeleccionado)) { // Solo generar reservas para el mes seleccionado o meses posteriores
            generarReserva(peluquero.id_peluquero, dia.id_dias, hora, 0, MesSeleccionado);
          }
        }
      }
    }
  
    setReservasGeneradas(true);
    setTimeout(() => {
      setReservasGeneradas(false);
    }, 10000);
  };
  
  //Busco el nombre del peluquero para la reserva
  const nombrePeluquero = (id_peluquero) => {
    const peluquero = peluqueros.find(p => p.id_peluquero === id_peluquero);
    return peluquero ? peluquero.nombre : 'Desconocido';
  };


  //Separo horas
  const separarHoras = (plantilla) => {
    return plantilla.map(p => p.hora.split(","));
  };


  //Cancelo la reserva
  const cancelarReserva = (id_reserva) => {
    const datosActualizar = {
      id_reserva: id_reserva,
      nombre: "",
      telefono: "",
      estado: 0
    };

    //Pongo estado a 0 para que vuelva a estar disponible
    axios.put(EDITARESTADORESERVAS, datosActualizar)
      .then(response => {
        console.log('Reserva cancelada con éxito:', response.data);
        setReservasActualizadas(reservasActualizadas.filter(r => r.id_reserva !== id_reserva));
        setCancelarAlert(true);

        setTimeout(() => {
          setCancelarAlert(false);
        }, 1500);
      })
      .catch(error => {
        console.error('Error al cancelar reserva:', error);
      });
  };


  //Borro la reserva
  const borrarReserva = (id_reserva) => {
    axios.delete(`${BORRARRESERBAS}?id_reserva=${id_reserva}`)
      .then(response => {
        console.log('Reserva borrada con éxito:');
        setReservasActualizadas(reservasActualizadas.filter(r => r.id_reserva !== id_reserva));
        setBorrarAlert(true);

        setTimeout(() => {
          setBorrarAlert(false);
        }, 1500);
      })
      .catch(error => {
        console.error('Error al borrar reserva:', error);
      });
  };


  //Meses con nombre para la fecha
  const getNombreMeses = () => {
    return [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  };

  return (
    <div>
      <div id='reservasOcupadas'>
        <p id='tituloOcupadas'>Reservas ocupadas</p>
        {reservasActualizadas.map(r => (
          <div key={r.id_reserva} className='cuerpoReserva'>
            <div>
              <p><b>Día:</b> {r.id_dias}</p>
              <p><b>Mes:</b> {r.mes}</p>
              <p><b>Hora:</b> {r.hora}</p>
              <p><b>Nombre:</b> {r.nombre}</p>
              <p><b>Telfono:</b> {r.telefono}</p>
              <p><b>Peluquero:</b> {nombrePeluquero(r.id_peluquero)}</p>
              <div className='botonesAdmin'>
                <button className='boton cancelar' onClick={() => cancelarReserva(r.id_reserva)}>Cancelar</button>
                <button className='boton borrar' onClick={() => borrarReserva(r.id_reserva)}>Borrar</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {cancelarAlert && <Alert color="success" onClick={() => setCancelarAlert(false)}>Reserva cancelada con éxito</Alert>}
      {borrarAlert && <Alert color="success" onClick={() => setBorrarAlert(false)}>Reserva borrada con éxito</Alert>}
      <p>
        <div>
          Selecciona un mes:
          <select value={MesSeleccionado} onChange={handleSelectChange}>
            {meses.map((month, index) => (
              index >= mesActual && <option key={index} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</option>
            ))}
          </select>

        </div>
        <Button onClick={generarReservasPorMes}>Generar Reservas</Button>
        {reservasGeneradas && <Alert color="success"><span>Generando reservas...</span><img id='imagenCarga' src={`${process.env.PUBLIC_URL}/${"carga.gif"}`} alt="Cargando" /></Alert>}
      </p>
      <p>
        <Button onClick={onVolverClick}>Volver a la vista cliente</Button>
      </p>
    </div>
  );
}

export default VistaAdmin;
