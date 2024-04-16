import React, { useId, useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
  Button,
} from 'reactstrap';
import Formulario from './Formulario';
import Preguntas from './Preguntas.json';


// devolver el fin del formulario y el contador
function Carrusel ({ datos,formAcabado }) {

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const [contador, setContador] = useState(Array(Preguntas.listaPreguntas.length).fill(null));          // Recuento de puntos
  const [aviso, setAviso] = useState("");
  const [finForm, setFinForm] = useState(false);        // Ver si el formulario ha terminado

  const [btnPulsado, setBtnPulsado] = useState(Array(Preguntas.listaPreguntas.length).fill(null))

  // Avanza uno
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  // Retrocede uno
  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  // Se ejecuta al hacer click
  const resultado = (nume, idPreg,indiceRes) => {
    const aux = JSON.parse(JSON.stringify(contador))

    const auxBtn = JSON.parse(JSON.stringify(btnPulsado))
    auxBtn[idPreg] = indiceRes
    aux[idPreg] = nume;
    setBtnPulsado(auxBtn)
    setContador(aux);
  }

  function comprobarFin () {
    // si hay alguna respuesta null te sale mensaje de aviso
    if (contador.find(d => d == null)=== undefined) {
      setFinForm(true)
      datos(contador, finForm)
    }else{
      setAviso("** Debe responder a todas las preguntas **")
    }

  }

  // DEVUELVE EL FORMULARIO POR CADA PREGUNTA
  const items = Preguntas.listaPreguntas.map((preg,indi) => {
    const item = {
      id: crypto.randomUUID(),
      altText: <h1 className='pregunta'>{preg.pregunta.pregunta}</h1>,
      caption: <Formulario pregunta={preg.pregunta} funcionPasa={next} funcionContar={resultado} indBtn = {btnPulsado[indi]} />
    }
    return item;
  })

  // Hace un map de todos los formularios
  const slides = items.map((item) => {
    return (
      <CarouselItem className="custom-tag" tag="div" key={item.id} onExiting={() => setAnimating(true)} onExited={() => setAnimating(false)}>
        <CarouselCaption captionText={item.caption} captionHeader={item.altText} />
      </CarouselItem>
    );
  });

  // Al final lo que devuelvo     Fondo mas oscuro ( #9F5748 )
  return (
    <div className='carrusel'>
      <style>
        {`.custom-tag {
              max-width: 100%;
              height: 600px;
              background: #642C1F;
              text-align:center;
            }
            .carousel-caption {
              position: static;
              width: 70%;
              margin: 0 auto;
              margin-top: 7rem;
              height: 500px;
            }
            `}



      </style>
      <h1>¿Qué fototipo eres?</h1>
      <Carousel activeIndex={activeIndex} pause='hover' interval="50000000" next={next} previous={previous}>
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
        {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
      <p><Button className='botones-grandes' onClick={()=>comprobarFin()}>Ver resultados</Button></p>
      <div className='aviso'>{aviso}</div>
    </div>
  );
}

export default Carrusel;