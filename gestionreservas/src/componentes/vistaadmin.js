import React, { useState, useEffect } from 'react';
import { Button, Alert, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { INSERTARRESERVAS, EDITARESTADORESERVAS, BORRARRESERBAS, REPETIDORESERVAS } from './datos';

function VistaAdmin({ peluqueros, dias, plantilla, onVolverClick, reservas }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPeluquero, setSelectedPeluquero] = useState('');
  const [selectedHora, setSelectedHora] = useState('');
  const [reservasGeneradas, setReservasGeneradas] = useState(false);
  const [reservasActualizadas, setReservasActualizadas] = useState([]);
  const [borrarAlert, setBorrarAlert] = useState(false);
  const [cancelarAlert, setCancelarAlert] = useState(false);
  const [reservasRegistradas, setReservasRegistradas] = useState(new Set());
  const [MesSeleccionado, setMesSeleccionado] = useState("enero");
  const [MesSeleccionado2, setMesSeleccionado2] = useState("");
  const [meses, setMeses] = useState([]);
  const [DiaSeleccionado, setDiaSeleccionado] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mesActual, setMesActual] = useState(0);
  const [diasDelMesSeleccionado, setDiasDelMesSeleccionado] = useState([]);
  const [camposIncompletosAlerta, setCamposIncompletosAlerta] = useState(false);
  const [reservaRepetidaAlerta, setReservaRepetidaAlerta] = useState(false);

  useEffect(() => {
    // Filtrar reservas y actualizar estado
    const filteredReservas = reservas.filter(r => r.estado === "1" && r.mes === MesSeleccionado && parseInt(r.id_dias) === DiaSeleccionado);
    setReservasActualizadas(filteredReservas);
  }, [reservas, MesSeleccionado, DiaSeleccionado]);

  useEffect(() => {
    // Lógica para obtener los nombres de los meses y establecer el mes seleccionado por defecto
    const mesActual = new Date().getMonth();
    const meses = getNombreMeses();
    setMesActual(mesActual);
    setMesSeleccionado(meses[mesActual]);
    setMesSeleccionado2(meses[mesActual]);
    setMeses(meses);
  }, []);

  // Función para abrir y cerrar la modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Función para manejar el cambio en la selección del peluquero
  const handlePeluqueroChange = (event) => {
    setSelectedPeluquero(event.target.value);
  };

  // Función para manejar el cambio en la selección de la hora
  const handleHoraChange = (event) => {
    setSelectedHora(event.target.value);
  };

  const handleMesSelectChangeModal = (event) => {
    const MesSeleccionadoValue = event.target.value;
    setMesSeleccionado2(MesSeleccionadoValue);
    const diasDelMesSeleccionado = dias.filter(dia => dia.mes === MesSeleccionadoValue);
    setDiasDelMesSeleccionado(diasDelMesSeleccionado);
  };


  // Generar las reservas de una en una
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

  // Cojo el valor del mes
  const handleMesSelectChange = (event) => {
    const MesSeleccionadoValue = event.target.value;
    setMesSeleccionado(MesSeleccionadoValue);
  };

  // Cojo el valor del día
  const handleDiaSelectChange = (event) => {
    const DiaSeleccionadoInt = parseInt(event.target.value);
    setDiaSeleccionado(DiaSeleccionadoInt);
  };

  // Cojo el valor del mes para el segundo select
  const handleMesSelectChange2 = (event) => {
    const MesSeleccionadoValue = event.target.value;
    setMesSeleccionado2(MesSeleccionadoValue);
  };


  const diasDelMesModal = () => {
    const currentDate = new Date().getDate();
    const mesActualIndex = meses.findIndex(month => month === MesSeleccionado2);

    if (mesActualIndex === mesActual) {
      return Array.from({ length: 31 - currentDate + 1 }, (_, i) => currentDate + i);
    } else {
      return Array.from({ length: 31 }, (_, i) => i + 1);
    }
  };




  // Generar las reservas por mes
  const generarReservasPorMes = () => {
    setLoading(true);
    const mesActual = new Date().getMonth();
    const currentDate = new Date().getDate();

    const selectedmeses = meses.slice(mesActual); // Obtener los meses desde el mes actual hasta diciembre

    const arraysDeHoras = separarHoras(plantilla);

    for (let i = 0; i < peluqueros.length; i++) {
      const peluquero = peluqueros[i];
      const horasDelPeluquero = arraysDeHoras[i];
      let diasParaGenerar = dias;

      // Si el mes seleccionado es el mes actual entonces empiezo a generar reservas desde el día actual
      if (MesSeleccionado2 === meses[mesActual]) {
        diasParaGenerar = dias.filter(dia => parseInt(dia.id_dias) >= currentDate);
      }

      for (const dia of diasParaGenerar) {
        for (const hora of horasDelPeluquero) {
          if (selectedmeses.includes(MesSeleccionado2)) { // Solo generar reservas para el mes seleccionado o meses posteriores
            generarReserva(peluquero.id_peluquero, dia.id_dias, hora, 0, MesSeleccionado2);
          }
        }
      }
    }

    setReservasGeneradas(true);
    setTimeout(() => {
      setReservasGeneradas(false);
      setLoading(false);
    }, 10000);
  };

  const generarReservaUnica = (id_peluquero, id_dia, hora, mes) => {
  const nuevaReserva = `${id_peluquero}-${id_dia}-${hora}-${mes}`;

  console.log(id_dia)
  // Verificar si la reserva ya existe en los datos existentes de reservas
  const reservaExistente = reservas.find(r =>
    r.id_peluquero === id_peluquero &&
    r.hora === hora && 
    r.mes === mes &&
    r.id_dia === id_dia
  );

  if (reservaExistente) {
    // Mostrar una alerta indicando que la reserva ya está ocupada
    alert('El peluquero ya tiene una reserva en esa fecha y hora.');
  } else {
    // Si no existe, insertar la reserva
    axios.post(INSERTARRESERVAS, {
      id_peluquero: id_peluquero,
      id_dia: id_dia,
      hora: hora,
      estado: 0,
      mes: mes
    })
      .then(res => {
        console.log(res.data);
        setReservasRegistradas(prevReservas => new Set(prevReservas.add(nuevaReserva)));
      })
      .catch(error => {
        console.error('Error al insertar reserva:', error);
      });
  }
};

  

  // Busco el nombre del peluquero para la reserva
  const nombrePeluquero = (id_peluquero) => {
    const peluquero = peluqueros.find(p => p.id_peluquero === id_peluquero);
    return peluquero ? peluquero.nombre : 'Desconocido';
  };

  // Separo horas
  const separarHoras = (plantilla) => {
    return plantilla.map(p => p.hora.split(","));
  };

  // Función para manejar la generación de reservas en la ventana modal
  const handleGenerarReservasModal = () => {
    if (!selectedPeluquero || !selectedHora || !MesSeleccionado2 || !DiaSeleccionado) {
      alert('Por favor, complete todos los campos antes de generar reservas.');
      return;
    }

    generarReservasPorMes();
    toggleModal();
  };


  // Cancelo la reserva
  const cancelarReserva = (id_reserva) => {
    const datosActualizar = {
      id_reserva: id_reserva,
      nombre: "",
      telefono: "",
      estado: 0
    };

    // Pongo estado a 0 para que vuelva a estar disponible
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

  // Borro la reserva
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

  // Meses con nombre para la fecha
  const getNombreMeses = () => {
    return [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
  };

  return (
    <div>
      <div className='filter-container'>
        <div className='filter-select'>
          <strong>Selecciona un mes para filtrar reservas:</strong>&nbsp; &nbsp;
          <select name="GenerarReservasMes" id='GenerarReservasMes' value={MesSeleccionado} onChange={handleMesSelectChange}>
            {meses.map((month, index) => (
              index >= mesActual && (
                <option key={index} value={month}>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </option>
              )
            ))}
          </select>
        </div>
        <div className='filter-select'>
          <strong>Selecciona un día:</strong>&nbsp; &nbsp;
          <select name="diasReserva" value={DiaSeleccionado} onChange={handleDiaSelectChange}>
            {dias.map(dia => (
              <option key={dia.id_dias} value={dia.id_dias}>{dia.id_dias}</option>
            ))}
          </select>
        </div>
      </div>
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
      <div className='filter-container'>
        <div className='filter-select'>
          <strong>Selecciona un mes para generar reservas:</strong>&nbsp; &nbsp;
          <select name="GenerarReservasMes2" id='GenerarReservasMes2' value={MesSeleccionado2} onChange={handleMesSelectChange2}>
            {meses.map((month, index) => (
              index >= mesActual && (
                <option key={index} value={month}>
                  {month.charAt(0).toUpperCase() + month.slice(1)}
                </option>
              )
            ))}
          </select>
        </div>
      </div>
      <Button onClick={generarReservasPorMes}>Generar Reservas</Button><br></br><br></br>
      <Button onClick={toggleModal}>Generar reservas con filtro</Button>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccionar peluquero y hora</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="selectPeluquero">Peluquero:</Label>
              <Input type="select" name="selectPeluquero" id="selectPeluquero" value={selectedPeluquero} onChange={handlePeluqueroChange}>
                <option value="">Seleccionar peluquero</option>
                {peluqueros.map(peluquero => (
                  <option key={peluquero.id_peluquero} value={peluquero.id_peluquero}>{peluquero.nombre}</option>
                ))}
              </Input>
            </FormGroup>
            {selectedPeluquero && (
              <>
                <FormGroup>
                  <Label for="selectHora">Hora:</Label>
                  <Input type="select" name="selectHora" id="selectHora" value={selectedHora} onChange={handleHoraChange}>
                    <option value="">Seleccionar hora</option>
                    {selectedPeluquero && plantilla[peluqueros.findIndex(p => p.id_peluquero === selectedPeluquero)].hora.split(',').map((hora, index) => (
                      <option key={index} value={hora}>{hora}</option>
                    ))}
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="selectMes">Mes:</Label>
                  <Input type="select" name="selectMes" id="selectMes" value={MesSeleccionado2} onChange={handleMesSelectChangeModal}>
                    {meses.slice(mesActual).map((month, index) => (
                      <option key={index} value={month}>
                        {month.charAt(0).toUpperCase() + month.slice(1)}
                      </option>
                    ))}
                  </Input>

                </FormGroup>
                <FormGroup>
                  <Label for="selectDia">Día:</Label>
                  <Input type="select" name="selectDia" id="selectDia" value={DiaSeleccionado} onChange={handleDiaSelectChange}>
                    {diasDelMesModal().map(dia => (
                      <option key={dia} value={dia}>{dia}</option>
                    ))}
                  </Input>
                </FormGroup>
              </>
            )}
          </Form>
        </ModalBody>
        {camposIncompletosAlerta && (
          <Alert color="danger">
            Por favor, complete todos los campos antes de generar reservas.
          </Alert>
        )}
        <ModalFooter>
          <Button color="primary" onClick={() => {
            if (!selectedPeluquero || !selectedHora || !MesSeleccionado2 || !DiaSeleccionado) {
              setCamposIncompletosAlerta(true);
              return;
            }
            generarReservaUnica(selectedPeluquero, DiaSeleccionado, selectedHora, MesSeleccionado2);
            toggleModal();
          }}>Generar Reserva</Button>{' '}

        </ModalFooter>
      </Modal>
      {loading && <Alert color="success"><span>Generando reservas...</span><img id='imagenCarga' src={`${process.env.PUBLIC_URL}/${"carga.gif"}`} alt="Cargando" /></Alert>}
      <p><br></br>
        <Button onClick={onVolverClick}>Volver a la vista cliente</Button>
      </p>
    </div>
  );
}

export default VistaAdmin;