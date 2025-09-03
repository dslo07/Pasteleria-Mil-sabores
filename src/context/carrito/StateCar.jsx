import React, { useState } from 'react'
import { carContext } from './carContext';

const StateCar = ({ children }) => {
  const [total,setTotal] = useState(2)
  const [productos,setProductos] = useState([])
  return (
    <carContext.Provider value={{productos,total}}>
      {children}
    </carContext.Provider>
  )
}

export default StateCar