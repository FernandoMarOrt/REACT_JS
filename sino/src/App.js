import React, { Component } from 'react';
import { Button,Card,CardImg,CardBody,CardTitle } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const Sino=(props)=>{
  return(<>
  <Card
  style={{
    width: '18rem'
  }}
>
  <CardImg
    src={props.imagen}
  />
  <CardBody>
    <CardTitle tag="h5">
      {props.Titulo}
    </CardTitle>
    <Button onClick={props.onClickSI}>
      {props.textobotonSi}
    </Button>
    <Button onClick={props.onClickNO}>
      {props.textobotonNo}
    </Button>
  </CardBody>
</Card>
  </>)
}

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      imagen:"/assets/img/yes.png"
    }
  }
  si(){this.setState({imagen:"/assets/img/yes.png"})}
  no(){this.setState({imagen:"/assets/img/no.jpeg"})}
  render(){
    return(
      <div className="App">
        <Sino
          imagen={this.state.imagen}
          Titulo="Yes or Not"
          textobotonSi="Oh yes!"
          textobotonNo="Oh no!"
          onClickSI={()=>this.si()}
          onClickNO={()=>this.no()}
        />

      </div>
    );
  }
}

export default App;
