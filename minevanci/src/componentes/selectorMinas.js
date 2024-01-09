import React from 'react';
import { Button } from 'reactstrap';

const Selector = (props) => {
  return (
    <div className="selector">
      {/* Accede al prop numeroMinas y muestra su valor */}
      <p>Numero de minas:&nbsp;&nbsp;{props.contador}&nbsp;&nbsp;    
      <Button onClick={props.pulsarAumentar}>+</Button>&nbsp;
      <Button onClick={props.pulsarDisminuir}>-</Button>
      </p>
    </div>
  );
}

export default Selector;