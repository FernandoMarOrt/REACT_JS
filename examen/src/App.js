import React, { Component, useState } from "react";
import { Button, Input, FormGroup, Label, Col, Table, ButtonGroup} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";


const Saldo=(props)=>{
//recuerda que puedes pasar const {}
  //GESTIÓN DE SALDO (SUMAR Y GASTAR)
  const [telefono,setTelefono]= useState('');
  const [saldo,setSaldo]=useState('');
  const [mensaje,setMensaje]=useState('');

 const handleChange = (event) => {
  let target=event.target;
  if(target.name=="telefono"){
    setTelefono(target.value);
  }
  if(target.name=="saldo"){
    setSaldo(target.value);
  }
 }

 const enviar=()=>{
  //VIKI POR FUNCIONALIDAD PARA QUE SEAN NUMEROS
 if( telefono !="" && saldo !="" ){

  if(telefono>0){
    console.log(telefono)
    console.log(saldo)
    props.actualizar(telefono,saldo);
  }else{
  setMensaje("Debes insertar números ")
  }
  

  
 }else{
  setMensaje("Debes rellenar todos los campos para actualizar saldo")
 }
  
 }


 return (
   <div>
     <h3>{props.titulo}</h3>
     <FormGroup row>
       <Label sm={1} > Teléfono: </Label>
       <Col sm={2}>
         <Input
           id="telefono"
           name="telefono"
           type="Text" onChange={handleChange} />
       </Col>
       <Label sm={1} > Saldo: </Label>
       <Col sm={2}>
         <Input
           id="saldo"
           name="saldo"
           type="Number" onChange={handleChange} />
       </Col>
     </FormGroup>


     <Button color="primary" onClick={()=>enviar(telefono,saldo)}>ACTUALIZAR</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
   </div>


 ); 
}


const Altas = (props) => {
// ALTAS DE USUARIOS
const [nombre,setNombre]= useState('');
const [telefono,setTelefono]= useState('');
const [saldo,setSaldo]=useState('');

const [mensaje,setMensaje]=useState('');

 const handleChange = (event) => {
  let target=event.target;

  if(target.name=="nombre"){
    setNombre(target.value);
  }
  if(target.name=="telefono"){
    setTelefono(target.value);
  }
  if(target.name=="saldo"){
    setSaldo(target.value);
  }
 }

 const enviar=()=>{
  //VIKI POR FUNCIONALIDAD PARA QUE SEAN NUMEROS
 if(nombre !="" && telefono!="" && saldo !="" ){
  
  props.alta(nombre,telefono,saldo);
 }else{
  setMensaje("Debes rellenar todos los campos para insertar")
 }
  
 }


 return (
   <div>
     <h3>Alta de usuario</h3>
     <FormGroup row>
       <Label sm={1} > Nombre: </Label>
       <Col sm={3}>
         <Input
           id="nombre"
           name="nombre"
           type="Text" onChange={handleChange} />
       </Col>
       <Label sm={1} > Teléfono: </Label>
       <Col sm={2}>
         <Input
           id="telefono"
           name="telefono"
           type="Text" onChange={handleChange} />
       </Col>
       <Label sm={1} > Saldo: </Label>
       <Col sm={2}>
         <Input
           id="saldo"
           name="saldo"
           type="Number" onChange={handleChange} />
       </Col>
     </FormGroup>


     <Button color="primary" onClick={()=>enviar()}>ALTA</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <p>{mensaje}</p>
   </div>


 );
}


const Mostrar = (props) => {
 // ESTE COMPONENTE MUESTRA LA TABLA
 //recibo datos y borrar
  let lista=props.datos;
 // console.log(lista)
  const {datos}=props;
 // console.log(datos)
 const [usuario,setUsuario]=useState('');

 
 return (
   <>
     <Table striped bordered hover size="sm">
       <thead>
         <tr>
           <th></th>
           <th>Teléfono</th>
           <th>Nombre</th>
           <th>Saldo</th>
         </tr>
       </thead>
       <tbody>
       <tr>
     <td>Boton</td>
     <td>telefono</td>
     <td>nombre</td>
     <td>saldo</td>
   </tr>
  
    {datos.map((x,index)=>{
   return ( <tr>
    <td><Button name="borrar" key={index} value={index} 
    onClick={()=>props.borrar(x)}>Borrar {index}</Button></td>
      <td>{x.telefono}</td>
      <td>{x.nombre}</td>
      <td>{x.saldo}</td>
      </tr>
      );
    })}
   
       </tbody>
     </Table>


   </>
 );
};






class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     // INSERTE AQUÍ EL ESTADO NECESARIO. AQUÍ SE GUARDARÁ TODA LA INFORMACIÓN
     listaUsuarios: [
      {nombre:"Paco", telefono:"12345", saldo:2},
      {nombre:"Juan Carlos", telefono:"123", saldo:3},
      {nombre:"Juan Carlos", telefono:"12345557", saldo:0},
      {nombre:"Juan Carlos", telefono:"12345527", saldo:0},
     ],
     opcion: 0,
     mostrarAlta:false,
     mostrarBaja:false,
     mostrarActualizar:false,
     mensaje:""
   };
 }

 //borra por telefono, sólo si su saldo es 0
 borrar(x){
   //me traigo la lista 
   let lista = JSON.parse(JSON.stringify(this.state.listaUsuarios));
  //recibo el objeto
  //miro si su saldo es 0 para poder borrarlo
  if(x.saldo==0){
  let aux= lista.filter((user)=>user.telefono !==x.telefono)

  //console.log(aux);
  this.setState({
    listaUsuarios:aux
    ,mensaje:"Usuario borrado con éxito"})


  }else{
    this.setState({mensaje:"No se puede borar este usuario"})
  }


 }

 agregarUsuario(n,t,s){
  //me traigo la lista 
  let lista = JSON.parse(JSON.stringify(this.state.listaUsuarios));

  console.log("Recido: " +n + ","+ t+","+s)
  //telefono único
  //busco si el teléfono está en la lista
  let estaRepe=lista.filter((v)=>v.telefono==t).length;

  console.log(estaRepe)
  if(estaRepe==0){
    //lo agregamos
    lista.push({
      nombre:n,
      telefono:t,
      saldo:s,

    });
    console.log(lista)
    this.setState({listaUsuarios:lista,
    mensaje:"Usuario agregado"})

  }else{
    //este repetido
    this.setState({
      mensaje:"Teléfono repetido,inserte otro"})

  }

 }

 //pasa pasar de int a entero parseInt
 sumarSaldo(t,saldo){
  //me traigo la lista 
  let lista = JSON.parse(JSON.stringify(this.state.listaUsuarios));
  //busco por el telefono si existe un usuario igual
  let existeUser=lista.filter((user)=>user.telefono==t);
  
  //como no se pueden repetir, solo habrá un telefono igual
  if(existeUser.length ==0){
    //no está
    this.setState({
      mensaje:"Teléfono NO encontrado, pruebe con otro"})

  }
  //esta
  if(existeUser.length ==1)
  {
   let saldoUsuario=lista.filter((user)=>user.telefono==t).map((v)=>v.saldo)
  console.log("Saldo viejo: "+ saldoUsuario[0])
    
    let nuevoSaldo= parseInt(saldoUsuario[0]) + parseInt(saldo);
    console.log("Nuevo saldo: "+ nuevoSaldo)
    //cojo al usuario a borrar, primero lo copio
    let nuevoUsuario=existeUser;
    let nNombre=nuevoUsuario.map((v)=>v.nombre)[0];
    let nTel=nuevoUsuario.map((v)=>v.telefono)[0];
     

    //borro usuario existente
    lista=lista.filter((user)=>user.telefono !==nTel);

    //lo subo a la lista
    lista.push( {nombre:nNombre,
      telefono:nTel,
      saldo:nuevoSaldo,}
);
      //NOTA JC*
      //Borro e inserto de nuevo, un usuario igual con el saldo actualizado.
    //lo encuentra
    this.setState({listaUsuarios:lista,
      mensaje:"Actualizado saldo"})

  }

 }
 restarSaldo(t,saldo){
  //me traigo la lista 
  let lista = JSON.parse(JSON.stringify(this.state.listaUsuarios));
  //busco por el telefono si existe un usuario igual
  let existeUser=lista.filter((user)=>user.telefono==t);
  
  //como no se pueden repetir, solo habrá un telefono igual
  if(existeUser.length ==0){
    //no está
    this.setState({
      mensaje:"Teléfono NO encontrado, pruebe con otro"})

  }
  //esta
  if(existeUser.length ==1)
  {
   let saldoUsuario=lista.filter((user)=>user.telefono==t).map((v)=>v.saldo)
  console.log("Saldo viejo: "+ saldoUsuario[0])
    
    let nuevoSaldo= parseInt(saldoUsuario[0]) - parseInt(saldo);
    console.log("Nuevo saldo: "+ nuevoSaldo)

    if(nuevoSaldo <=0){
      nuevoSaldo=0;
    }
    //cojo al usuario a borrar, primero lo copio
    let nuevoUsuario=existeUser;
    let nNombre=nuevoUsuario.map((v)=>v.nombre)[0];
    let nTel=nuevoUsuario.map((v)=>v.telefono)[0];
     

    //borro usuario existente
    lista=lista.filter((user)=>user.telefono !==nTel);

    //lo subo a la lista
    lista.push( {nombre:nNombre,
      telefono:nTel,
      saldo:nuevoSaldo,}
);
      //NOTA JC*
      //Borro e inserto de nuevo, un usuario igual con el saldo actualizado.
    //lo encuentra
    this.setState({listaUsuarios:lista,
      mensaje:"Actualizado saldo"})

  }

 }


 mostrar(){
console.log("deberia mostrar alta")
this.setState({mostrarAlta:true,
  mostrarActualizar:false,
mostrarBaja:false})
 }

 mostrar2(){
  console.log("deberia mostrar actualizar")
  this.setState({mostrarAlta:false,
    mostrarActualizar:true,
  mostrarBaja:false})
   }

   mostrar3(){
    console.log("deberia mostrar bajar")
    this.setState({mostrarAlta:false,
      mostrarActualizar:false,
    mostrarBaja:true})
     }


 render() {
  let obj=<></>;
  if(this.state.mostrarAlta){
      obj=<>
      <Altas alta={(n,t,s)=>this.agregarUsuario(n,t,s)}/>
      </>
  }
  if(this.state.mostrarActualizar){
    obj=<><Saldo actualizar={(tel,saldo)=>this.sumarSaldo(tel,saldo)}/></>
  }
  if(this.state.mostrarBaja){
    obj=<><Saldo actualizar={(tel,saldo)=>this.restarSaldo(tel,saldo)}/> </>

  }




   return (
     <div className="App">
       <h1>GESTION USUARIOS</h1>

       <Mostrar datos={this.state.listaUsuarios} borrar={(t) => this.borrar(t)} />
       <ButtonGroup>
         {/* <Button color="info" datos={this.state.listaUsuarios}
         alta={(n,t,s)=>this.agregarUsuario(n,t,s)}
         onClick={()=>alta()}
         > */}
         <Button color="info" onClick={()=>this.mostrar()}>
           Alta usuario
         </Button>
         <Button color="success" onClick={()=>this.mostrar2()}>
           Sumar saldo
         </Button>
         <Button color="danger"  onClick={()=>this.mostrar3()}>
           Gastar saldo
         </Button>
       </ButtonGroup>

       {obj}

    
         {/* me tengo que traer telefono y saldo */}
       {/* <Saldo actualizar={(tel,saldo)=>this.sumarSaldo(tel,saldo)}/> */}

       {/* <h2>Gastar Saldo</h2> */}
         {/* me tengo que traer telefono y saldo */}
        {/* <Saldo actualizar={(tel,saldo)=>this.restarSaldo(tel,saldo)}/>  */}
         
       <h2>{this.state.mensaje}</h2>


     </div>
   );
 }
}
export default App;
