import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button } from 'reactstrap';

function Boton(props) {
return (
<Button color={props.col} onClick={()=>props.cambia()}>
Pulsa para cambiar de color.
</Button>
)
}
class App extends React.Component {
constructor(props) {
super(props);
this.state = {
color: "danger",
}
}
cambia() {
if (this.state.color === "danger") {
this.setState({ color: "success" })
} else {
this.setState({ color: "danger" })
}
}
render() {
return (
<div className="App">
<Boton col={this.state.color} cambia={()=>this.cambia()}/>
</div>
);
}
}

export default App;