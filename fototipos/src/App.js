import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carrusel from './componentes/Carrusel'
import './App.css';
import Resultado from './componentes/Resultado.js'
import Grafica from './componentes/Grafica.js';



function App() {
  const [resultado, setResultado] = useState(0);
  const [formAcabado, setFormAcabado] = useState(false);


  // Recoger la cantidad de puntos y si se ha terminado el formulario
  function comprobarDatos(contador, finForm) {
    setFormAcabado(true)
    // contar todos los puntos del contador y setear resultado
    let suma = contador.reduce((v1, v2) => v1 + v2);
    setResultado(suma)
  }

  function repetirTest() {
    setFormAcabado(false)
    setResultado(0)
  }

  let obj;

  if (!formAcabado) {
    obj = <>
      <Carrusel datos={comprobarDatos}></Carrusel>
      <h2>La melanina</h2>
      <p className='parrafos'>
        La melanina es el factor de protección propio más importante del que dispone
        la piel y su función es la de absorber la radiación. La exposición solar
        estimula su producción y esto se traduce en el bronceado, por eso se
        distinguen dos tipos de bronceado, uno inmediato y otro retardado.
      </p>
      <h2>¿Qué son los fototipos? Clasificación de Fitzpatrick </h2>
      <p className='parrafos'>
        Lo que determina si <strong>una piel se broncea o no es el fototipo</strong>; esto es,
        cómo se adapta cada piel al sol y en qué grado lo hace. Cuanto más baja
        sea esta capacidad, menos contrarrestarán los efectos de las radiaciones
        solares en la piel y viceversa.
      </p>
      <p className='parrafos'>
        Para saber cuál es nuestro tipo de piel es importante fijarse en zonas del
        cuerpo que no estén continuamente expuestas al sol, como pueden ser: la zona
        inferior de las piernas (justo sobre los tobillos), detrás de la rodilla o la
        zona interna del antebrazo. Zonas como la cara, el cuello o los brazos no
        aportarán una información certera sobre el fototipo, puesto que están en
        contacto continuo con las radiaciones solares.
      </p>
    </>
  } else {
    obj = <Resultado puntos={resultado} repetir={() => repetirTest()} />
  }

  return (
    <div className="App">
      {obj}
    </div>
  );
}

export default App;
