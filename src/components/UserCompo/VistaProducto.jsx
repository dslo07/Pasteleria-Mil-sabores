import React from 'react'
import { useLocation } from "react-router-dom";
import NavBar from './NavBar';
import ProductosMain from './ProductosMain'
const VistaProducto = () => {
  const location = useLocation();
  const { producto } = location.state;
  return (
    <div >
      <NavBar/>

        {producto.nombre}
    <ProductosMain/>
    </div>
  )
}

export default VistaProducto 
