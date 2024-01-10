import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';
import AppLogin from './componentes/AppLogin.js';
import Menu from './componentes/Menu.js';
import { Component } from 'react';


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      menuItem:"DOS",
      logged:false,
    }
  }

  changeMenu(item){
    this.setState({menuItem:item})
  }

  userLogin(telefono,password){
    if(telefono=="admin" && password=="1234"){
      this.setState({logged:true})
    }
  }


  render(){
    let obj = <Menu menuItem={this.state.menuItem} changeMenu={(item)=>this.changeMenu(item)}/> 
    if(!this.state.logged){
      obj = <AppLogin userLogin={(telefono,password)=>this.userLogin(telefono,password)}/>
    }


    return(
      <div className="App">
        {obj}
      </div>
    )
  }
}
export default App;
