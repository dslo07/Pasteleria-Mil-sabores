import React, { useContext } from 'react'
import {carContext} from '../context/carrito/carContext'
const Carrito = () => {
  const { productos,total } = useContext(carContext)
  console.log(productos);
  
  return (
    <div>
      {total}
    </div>
  )
}

export default Carrito