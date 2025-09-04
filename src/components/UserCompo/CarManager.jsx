import React from 'react'
import CardCar from './CardCar'

export const CarManager = ({ productos }) => {
  return (
    <div>
      {
        productos.length > 0
          ? productos.map((prod) => (
              <CardCar key={prod.codigo} producto={prod} />
            ))
          :          
      <div className='d-flex justify-content-center aling-items-center'>
        <div>
            <iframe src="https://lottie.host/embed/5e40b073-b377-4478-90b6-3063979e9173/1flk4fzWIT.lottie"></iframe>
            <h2>No tienes carritos aun </h2>
        </div>
      </div>
        }
    </div>
  )
}

export default CarManager
