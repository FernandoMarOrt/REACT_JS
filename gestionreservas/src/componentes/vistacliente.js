import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import '../App.css';

function VistaCliente({ peluqueros }) {
  return (
    <div>
        <h1>Reservas</h1>
        <div id='contenedorReservas'>
          {peluqueros.map(p => (
            <div key={p.id_peluquero} className='reservasPeluqueros'>
              <div>
                <img src={process.env.PUBLIC_URL + "/" + p.id_peluquero + ".webp"} className='imgPeluqueros' alt={p.nombre} />
                <p className='nombrePeluqueros'>{p.nombre}</p>
              </div>
            </div>
          ))}
        </div>
    </div>
  );
}

export default VistaCliente;
