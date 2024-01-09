import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Button} from 'reactstrap';


class App extends React.Component{
constructor(props){
super(props);
this.state = {
color:"danger",
}
}

cambia(){
if (this.state.color === "danger"){
this.setState({color:"success"})
}else{
this.setState({color:"danger"})
}
}

render() {
return (
<div className="App">
<Button color={this.state.color} onClick={()=>this.cambia()}>
Pulsa para cambiar de color.
</Button>

</div>
);
}
}

export default App;