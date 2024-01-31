import {Input} from 'reactstrap';
export default function Tres(props) {
    return (
        
        <div>
        <h1>Hola soy 3</h1>
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
