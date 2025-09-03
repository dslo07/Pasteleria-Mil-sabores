import React, { useState } from 'react'
import { carContext } from './carContext';

const StateCar = ({ children }) => {
  const [total,setTotal] = useState(2)
  const [productos,setProductos] = useState([
  {
    "codigo": "TC001",
    "categoria": "Tortas Cuadradas",
    "nombre": "Torta Cuadrada de Chocolate",
    "precio": 45000,
    "moneda": "CLP",
    "imagenURL": "https://patty.pe/wp-content/uploads/2024/05/TORTA-CUADRADA-2.png",
    "descripcion": "Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales."
  },
  {
    "codigo": "TC002",
    "categoria": "Tortas Cuadradas",
    "nombre": "Torta Cuadrada de Frutas",
    "precio": 50000,
    "moneda": "CLP",
    "imagenURL": "https://i.pinimg.com/1200x/6e/12/02/6e1202f87816ce16f374ba3fd22e6d2c.jpg",
    "descripcion": "Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones."
  },
  {
    "codigo": "TT001",
    "categoria": "Tortas Circulares",
    "nombre": "Torta Circular de Vainilla",
    "precio": 40000,
    "moneda": "CLP",
    "imagenURL": "https://1.bp.blogspot.com/-5CbPr1SaKxI/Vx_Fb223-cI/AAAAAAAACzU/T1e_AmLeN28Qxemi89lEdKooISN3p9H9gCKgB/s1600/Vanilla%2BCake%2BSySPMS.jpg",
    "descripcion": "Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión."
  }
  ])
  return (
    <carContext.Provider value={{productos,total}}>
      {children}
    </carContext.Provider>
  )
}

export default StateCar