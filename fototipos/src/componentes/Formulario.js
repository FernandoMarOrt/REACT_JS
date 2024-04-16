import React, { useState } from 'react';
import { Button } from 'reactstrap';

function Formulario ({ pregunta, funcionPasa, funcionContar,indBtn }) {

    let respuestas = pregunta.respuestas.map((resp, indi) => {
        let boton = <Button key={pregunta.id} className="botones" onClick={() => { funcionPasa(); funcionContar(pregunta.valor[indi], pregunta.id,indi)}}>{resp}</Button>
        if(indBtn == indi){
            boton = <Button key={pregunta.id} className="boton-pulsado" onClick={() => { funcionPasa(); funcionContar(pregunta.valor[indi], pregunta.id,indi)}}>{resp}</Button>
        }
        return (
            <>
            {boton}
            </>
        );
    })

    return (
        <div className='respuestas'>
            {respuestas}
        </div>
    );
}

export default Formulario;