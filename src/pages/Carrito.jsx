import React, { useContext } from 'react'
import NavBar from '../components/UserCompo/NavBar'
import {carContext} from '../context/carrito/carContext'
import CardCar from '../components/UserCompo/CardCar'
const Carrito = () => {
  const { productos,total } = useContext(carContext)
  
  
  return (
    <>
    <div >
      <NavBar/>
    </div>
      <section >
        <div className='separador'></div>
        <div className='container'>
          <h1>Mi carrito de compras</h1>
          <div className='row d-flex'>
            <div className='col-8 overflow-auto border p-2'  style={{ maxHeight: "400px",maxWidth:"500px" }}>
                {
                  productos.map((prod)=>(<CardCar key={prod.codigo} producto={prod}/>))
                }
            </div>
            <div className='col-2'>
                <h1>total </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Carrito