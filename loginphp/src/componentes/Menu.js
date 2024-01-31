import React, { useState } from 'react';
import {
 Navbar,
 NavbarBrand,
 NavLink,
 Button,
} from 'reactstrap';
import Uno from './Uno'
import Dos from './Dos'
import Tres from './Tres'

export default function Menu(props) {
  let colorUno = 'secondary'
  let colorDos = 'secondary'
  let colorTres = 'secondary'
  let obj = ""

  switch (props.menuItem) {
    case 'UNO':
      colorUno = 'primary'
      obj = <Uno textoEscrito={props.textoEscrito} cambiarTexto={props.cambiarTexto}></Uno>
      break;
    case 'DOS':
      colorDos = 'primary'
      obj = <Dos textoEscrito={props.textoEscrito} cambiarTexto={props.cambiarTexto}></Dos>
      break;
    case 'TRES':
      colorTres = 'primary'
      obj = <Tres textoEscrito={props.textoEscrito} cambiarTexto={props.cambiarTexto}></Tres>
      break;
  }
  return (
    <div>
      <Navbar>
        <NavbarBrand href="/">MYFPSCHOOL</NavbarBrand>
        <NavLink>
          <Button color={colorUno} onClick={() => props.changeMenu("UNO")}>UNO</Button>{" "}
          <Button color={colorDos} onClick={() => props.changeMenu("DOS")}>DOS</Button>{" "}
          <Button color={colorTres} onClick={() => props.changeMenu("TRES")}>TRES</Button>
        </NavLink>
      </Navbar>
      <div>{obj}</div>
    </div>
  );
}

