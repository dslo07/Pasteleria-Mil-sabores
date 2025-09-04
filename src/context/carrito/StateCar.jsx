import React, { useEffect, useState } from 'react'
import { carContext } from './carContext';

const StateCar = ({ children }) => {
  const [productos,setProductos] = useState([])
  const [total,setTotal] = useState(0)
  const [costo,setCosto] = useState(0)
  const [cupon,setCupon] = useState({
    codigo:"",
    descuento:0
  })

  useEffect(()=>{
    let suma = productos.reduce((acc, prod) => acc + prod.precio, 0)

    // aplicar descuento solo si existe cupón válido
    if (cupon?.descuento > 0) {
      suma -= cupon.descuento
    }

    setCosto(suma)
    setTotal(productos.length)
  },[ productos, cupon ]);

  const agregarProd = (prod) => {
    if(!prod.inCar){
      prod.inCar = true;
      setProductos([...productos,prod])
    }else{
      alert("El producto ya esta en el carrito")
    }
  }

  return (
    <carContext.Provider value={{productos,total,costo,cupon, agregarProd}}>
      {children}
    </carContext.Provider>
  )
}

export default StateCar