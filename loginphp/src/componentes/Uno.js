import {Input} from 'reactstrap';
export default function Uno(props) {

    return (
        <div>
      <h1>Hola soy 1</h1>
      <Input
         id="texto"
         name="texto"
         type="text"
         value={props.textoEscrito}
         onChange={(texto) => props.cambiarTexto(texto.target.value)}
       />
       </div>
    )
  }
  