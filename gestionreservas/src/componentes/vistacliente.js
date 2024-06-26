import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button, Alert, Badge } from 'reactstrap';
import axios from "axios";
import { EDITARRESERVAS } from './datos';

function VistaCliente({ peluqueros, reservas, dias, fetchReservas, fechaActual }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [alerta, setAlerta] = useState(false);
  const [DiaSeleccionado, setDiaSeleccionado] = useState(1); // Filtro día que comienza en 1 para los días
  const [MesSeleccionado, setMesSeleccionado] = useState("enero"); // Filtro mes que empieza en enero
  const [reservasFiltradas, setReservasFiltradas] = useState([]);

  // Abre/Cierra Ventana modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Llamada a la modal
  const handleReservarClick = (reserva) => {
    setReservaSeleccionada(reserva);
    toggleModal();
  };

  // Filtrar las reservas por el día seleccionado
  useEffect(() => {
    const filteredReservas = reservas.filter(r => parseInt(r.id_dias) === DiaSeleccionado && r.mes === MesSeleccionado);
    setReservasFiltradas(filteredReservas);
  }, [reservas, DiaSeleccionado, MesSeleccionado]);

  // Cuando le doy click confirmo la reserva
  const handleReservaConfirmada = () => {
    if (nombre.trim() === '' || telefono.trim() === '') {
      setAlerta(true);
    } else {
      if (reservaSeleccionada) {
        reservaSeleccionada.estado = "1";
        const datosActualizar = {
          id_reserva: reservaSeleccionada.id_reserva,
          nombre: nombre.trim(),
          telefono: telefono.trim(),
          estado: "1"
        };

        axios.put(EDITARRESERVAS, datosActualizar)
          .then(response => {
            console.log('Datos actualizados correctamente:', response.data);
            fetchReservas(); // Actualizar las reservas para que al confirmar desaparezcan
          })
          .catch(error => {
            console.error('Error al actualizar datos:', error);
          });
      }
      toggleModal();
    }
  };

  // Filtro por el mes
const handleMesSelectChange = (event) => {
  const MesSeleccionadoValue = event.target.value;
  setMesSeleccionado(MesSeleccionadoValue);
};


  // Función para manejar el click en los badges de día
  const handleBadgeClick = (dia) => {
    setDiaSeleccionado(dia);
  };

  // Función para obtener los días correspondientes al mes seleccionado
  const diasDelMes = () => {
    switch (MesSeleccionado) {
      case 'febrero':
        return Array.from({ length: 28 }, (_, i) => i + 1);
      case 'abril':
      case 'junio':
      case 'septiembre':
      case 'noviembre':
        return Array.from({ length: 30 }, (_, i) => i + 1);
      default:
        return Array.from({ length: 31 }, (_, i) => i + 1);
    }
  };

  return (
    <div>
      <h1>Reservas</h1>
      <div className='mesSeleccionado'>
        <p><strong>Mes seleccionado:</strong> {MesSeleccionado}</p>
      </div>
      <div className='mesSeleccion'>
        <strong>Selecciona un mes:</strong>&nbsp; &nbsp;
        <select name="mesReserva" value={MesSeleccionado} onChange={handleMesSelectChange}>
          <option key={"enero"} value={"enero"}>Enero</option>
          <option key={"febrero"} value={"febrero"}>Febrero</option>
          <option key={"marzo"} value={"marzo"}>Marzo</option>
          <option key={"abril"} value={"abril"}>Abril</option>
          <option key={"mayo"} value={"mayo"}>Mayo</option>
          <option key={"junio"} value={"junio"}>Junio</option>
          <option key={"julio"} value={"julio"}>Julio</option>
          <option key={"agosto"} value={"agosto"}>Agosto</option>
          <option key={"septiembre"} value={"septiembre"}>Septiembre</option>
          <option key={"octubre"} value={"octubre"}>Octubre</option>
          <option key={"noviembre"} value={"noviembre"}>Noviembre</option>
          <option key={"diciembre"} value={"diciembre"}>Diciembre</option>
        </select>
      </div>
      <div id='badges'>
        {diasDelMes().map(dia => (
          <Badge
            key={dia}
            color={DiaSeleccionado === dia ? "secondary" : "primary"}
            onClick={() => handleBadgeClick(dia)}
            style={{ cursor: "pointer", marginRight: "5px" , padding: "0.5rem"}}
          >
            {dia}
          </Badge>
        ))}
      </div>
      <div id='contenedorReservas'>
        {peluqueros.map(p => (
          <div key={p.id_peluquero} className='reservasPeluqueros'>
            <div>
              <img src={process.env.PUBLIC_URL + "/" + p.id_peluquero + ".webp"} className='imgPeluqueros' alt={p.nombre} />
              <p className='nombrePeluqueros'>{p.nombre}</p>
            </div>
            {reservasFiltradas.filter(r => r.id_peluquero === p.id_peluquero && r.estado === "0").length > 0 ? (
              reservasFiltradas.filter(r => r.id_peluquero === p.id_peluquero && r.estado === "0").map(r => (
                <div key={r.id_reserva} className='mostrarReserva'>
                  <div>
                    <p><b>Día:</b> {r.id_dias}</p>
                    <p><b>Hora:</b> {r.hora}</p>
                    <p><b>Precio:</b> {p.precio}€</p>
                    <Button color='success' id='confirmarReserva' onClick={() => handleReservarClick(r)}>Reservar</Button>
                  </div>
                </div>
              ))
            ) : (
              <div id='mensajeSinReservas'>No hay reservas disponibles para este mes y este día, lo sentimos.</div>
            )}
          </div>
        ))}
      </div>
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Confirmar reserva</ModalHeader>
        <ModalBody>
          <p><b>Peluquero:</b> {reservaSeleccionada && peluqueros.find(p => p.id_peluquero === reservaSeleccionada.id_peluquero).nombre}</p>
          <p><b>Día:</b> {reservaSeleccionada && reservaSeleccionada.id_dias}</p>
          <p><b>Hora:</b> {reservaSeleccionada && reservaSeleccionada.hora}</p>
          <p><b>Precio:</b> {reservaSeleccionada && peluqueros.find(p => p.id_peluquero === reservaSeleccionada.id_peluquero).precio}€</p>
          <Form>
            <FormGroup>
              <Label for="nombre">Nombre:</Label>
              <Input type="text" name="nombre" id="nombre" value={nombre} placeholder='Rellene con su nombre por favor' onChange={(e) => setNombre(e.target.value)} />
              {alerta && nombre.trim() === '' && <Alert color="danger">Por favor, complete este campo.</Alert>}
            </FormGroup>
            <FormGroup>
              <Label for="telefono">Teléfono:</Label>
              <Input type="tel" name="telefono" id="telefono" maxLength={9} placeholder='Rellene con su teléfono por favor' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              {alerta && telefono.trim() === '' && <Alert color="danger">Por favor, complete este campo.</Alert>}
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleReservaConfirmada}>Confirmar reserva</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default VistaCliente;
