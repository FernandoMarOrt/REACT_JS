import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from 'reactstrap';
import TipoPieles from './TipoPieles.json';
import axios from 'axios';
import Grafica from './Grafica.js';



function Tarjeta({ id }) {

  const fotoTipo = TipoPieles.fototipos.find(fp => fp.id == id)
  return (
    <Card className='carta-pieles'>
      <img alt="Tipo de piel" src={fotoTipo.imagen} className='imagen' />
      <CardBody>
        <CardTitle tag="h2">
          {fotoTipo.nombre}
        </CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h5" >
          ¿Qué nos dice tu piel?
        </CardSubtitle>
        <CardText className={fotoTipo.color}>
          <div className='text-carta'>
            Tu piel es {fotoTipo.piel} <br />
            Tu pelo es {fotoTipo.pelo} <br />
            Tus ojos son {fotoTipo.ojos} <br />
            Tu sensibilidad solar es {fotoTipo['sensibilidad solar']} <br />
          </div>
        </CardText>
      </CardBody>
    </Card>
  );
}

function Resultado({ puntos, repetir }) {
  // Sacar el resultado dependiendo de los puntos que se han sacado
  // < 8      FotoTipo 1
  // 8 - 21   FotoTipo 2
  // 22 - 42  FotoTipo 3
  // 43 - 68  FotoTipo 4
  // 69 - 84  FotoTipo 5
  // > 85     FotoTipo 6

  let idFotot = 0
  if (puntos < 8) {
    idFotot = 1

  } else if (puntos >= 8 && puntos <= 21) {
    idFotot = 2

  } else if (puntos >= 22 && puntos <= 42) {
    idFotot = 3

  } else if (puntos >= 43 && puntos <= 68) {
    idFotot = 4

  } else if (puntos >= 69 && puntos <= 84) {
    idFotot = 5

  } else if (puntos > 85) {
    idFotot = 6
  }

  const [data, setData] = useState("");

  useEffect(() => {
    // Función para realizar la solicitud GET
    const fetchData = async () => {
      try {
        const response = await axios.post('https://thematic-learning.com/2DAW2024/ALVARO/encuesta_voto.php?voto=' + idFotot);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamada a la función para realizar la solicitud cuando el componente se monta
    fetchData();
  }, []);

  return (
    <div className='body-resultado'>
      <h1>Tu tipo de piel es ...</h1>
      <Tarjeta id={idFotot}/>

      <p className='parrafos'>
        La piel es el órgano más grande del cuerpo y al mismo tiempo,
        la que más expuesta queda a todo tipo de agentes externos, como
        la contaminación, por ejemplo, o las radiaciones directas del sol.
        Estas últimas <strong>resultan muy peligrosas para el ser humano </strong>debido a que
        pueden ser la causa de distintos tipos de cáncer o lesiones que se vuelven
        <strong>irreversibles.</strong>
      </p>
      <p className='parrafos'>
        Para evitar los posibles trastornos causados por la radiación solar,
        la piel dispone de una protección natural. Estos mecanismos de protección
        cutánea actúan de dos formas; o absorben la radiación o la desvían. Entre
        los que la absorben destacan el ácido urocánico (se produce a partir de la
        histidina y cambia su formulación actuando como filtro UVB), la melanina, el
        ADN, el ARN y el triptófano. El vello o el manto graso de la piel desvían
        aproximadamente el 5% de la radiación.
      </p>


      <Button onClick={repetir} className='botones-grandes'> Rehacer test </Button>

      <h2>Resultados en el instituto</h2>
      <Grafica datos={data}/>
    </div>
  );
}

export default Resultado;