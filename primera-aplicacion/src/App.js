import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';

function Boton(props) {
return (
<Button onClick={()=>props.cambia()}>
{props.nombre}
</Button>
)
}
class App extends React.Component {
constructor(props) {
super(props);
this.state = {
letrero: "saludo en diferentes idiomas",
}
}
cambiaIngles() {
this.setState({letrero:"Hello"})
}
cambiaFrances() {
this.setState({letrero:"Bonjour"})
}
cambiaEspanol() {
this.setState({letrero:"Hola"})
}

render() {
return (
<div className="App">
<h1>{this.state.letrero}</h1>
<Boton nombre={"Inglés"} cambia={()=>this.cambiaIngles()}/>
<Boton nombre={"Francés"} cambia={()=>this.cambiaFrances()}/>
<Boton nombre={"Español"} cambia={()=>this.cambiaEspanol()}/>
</div>
);
}
}

export default App;