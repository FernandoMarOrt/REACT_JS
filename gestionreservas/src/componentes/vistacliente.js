import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../App.css';

function VistaCliente({ peluqueros, reservas }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleReservarClick = (reserva) => {
    setReservaSeleccionada(reserva);
    toggleModal();
  };

  const handleReservaConfirmada = () => {
    //Cuando confirme tengo que editar reserva y mirar que nombre y telefono no esten vacios
    
    toggleModal();

  };

  return (
    <div>
      <h1>Reservas</h1>
      <div id='contenedorReservas'>
        {peluqueros.map(p => ( //Muestro peluqueros
          <div key={p.id_peluquero} className='reservasPeluqueros'>
            <div>
              <img src={process.env.PUBLIC_URL + "/" + p.id_peluquero + ".webp"} className='imgPeluqueros' alt={p.nombre} />
              <p className='nombrePeluqueros'>{p.nombre}</p>
            </div>
            {reservas.filter(r => r.id_peluquero === p.id_peluquero && r.estado === 0).map(r => ( //Para mostrar las reservas que no estan ocupadas
              <div key={r.id_reserva} className='mostrarReserva'>
                <div>
                  <p><b>Día:</b> {r.id_dias}</p>
                  <p><b>Hora:</b> {r.hora}</p>
                  <p><b>Precio:</b> {p.precio}€</p>
                  <Button color='success' id='confirmarReserva' onClick={() => handleReservarClick(r)}>Reservar</Button>
                </div>
              </div>
            ))}
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
            </FormGroup>
            <FormGroup>
              <Label for="telefono">Teléfono:</Label>
              <Input type="tel" name="telefono" id="telefono" placeholder='Rellene con su telefono por favor' value={telefono} onChange={(e) => setTelefono(e.target.value)} />
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
