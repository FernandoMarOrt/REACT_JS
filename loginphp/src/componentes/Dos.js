import {Input} from 'reactstrap';
export default function Dos(props) {

    return (
        
        <div>
        <h1>Hola soy 2</h1>
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
