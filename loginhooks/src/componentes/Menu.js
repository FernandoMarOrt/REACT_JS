import React, { useState } from 'react';
import {
 Navbar,
 NavbarBrand,
 NavLink,
 Button,
} from 'reactstrap';


export default function Menu({menuItem, handleClick}){
 let colorUno = 'secondary'
 let colorDos = 'secondary'
 let colorTres = 'secondary'
 switch (menuItem){
     case 'UNO':
       colorUno = 'primary'
       break;
     case 'DOS':
       colorDos = 'primary'
       break;
     case 'TRES':
       colorTres = 'primary'
       break;
   }
   return (
     <div>
       <Navbar>
         <NavbarBrand href="/">MYFPSCHOOL</NavbarBrand>
         <NavLink>
         <Button color={colorUno} onClick={() => handleClick("UNO")} >UNO</Button>{" "}
         <Button color={colorDos} onClick={() => handleClick("DOS")}>DOS</Button>{" "}
         <Button color={colorTres} onClick={() => handleClick("TRES")}>TRES</Button>
         </NavLink>
       </Navbar>
     </div>
   );
}
