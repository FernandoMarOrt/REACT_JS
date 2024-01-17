import React, { useState } from 'react';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function Buscador(props) {

  return (
    <div>
      <p><label>Buscador:</label></p>
      <input type='text' id='buscador' placeholder='introduce un nombre' onChange={props.buscarpueblo} />
      <div>
        <p>Resultados de la búsqueda:</p>
        <ul>
          {props.resultado.map((pueblo, index) => (
            <li key={index}>{pueblo}</li>
          ))}
        </ul>
      </div>
    </div>

  );

} 




function App() {
  const pueblos = ["Estepona", "Estepa", "Escañela", "Leon", "Alcorcon"];
  const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

  const handleChange = (event) => {
    const datosBuscador = event.target.value.toLowerCase();
    //startsWith que empieza por el dato
    //endWith acaba por el dato
    //includes si tiene una p por en medio te lo saca tambien si include cualquier cadena
    const resultados = pueblos.filter((pueblo) => pueblo.toLowerCase().startsWith(datosBuscador));
    setResultadosBusqueda(resultados);
  }

  return (
    <div className="App">
      <Buscador
        buscarpueblo={handleChange}
        resultado={resultadosBusqueda}
      />
    </div>
  );
}

export default App;
