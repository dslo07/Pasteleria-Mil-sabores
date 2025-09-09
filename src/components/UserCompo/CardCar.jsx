import React,{ useContext } from 'react'
import { carContext } from '../../context/carrito/carContext';
import { FaPlusCircle } from "react-icons/fa";
import { CgMathMinus } from "react-icons/cg";
import { useConvert } from '../../hooks/useConvert';
import { useEffect } from 'react';

const CardCar = ({producto}) => {
    const { controlCantidad,quitarProducto } = useContext(carContext)

  return (
    <div className="card mb-3" style={{maxWidth: "540px"}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={producto.imagenURL} className="img-fluid rounded-start" alt={producto.Nombre}/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fs-6">{producto.categoria}</h5>
            <p className="fs-6">{producto.descripcion}.</p>
            <div>
              <div  className='d-flex justify-content-between'>
                <p className='spanCant rounded' >Cant: {producto.cantInCar}</p>
                <span> {useConvert(producto.precio)} </span>
              </div>
              <div className='d-flex justify-content-between'>
                <div className='d-flex gap-2'>
                  <button className='btn btn-comprar  text-center px-2 py-1' onClick={ () => controlCantidad("suma",producto)} > <FaPlusCircle/> </button>
                  <button className='btn btn-comprar text-center px-2 py-1'  onClick={ () => controlCantidad("resta",producto)} > <CgMathMinus/> </button>
                </div>
                <div>
                  <button className='btn btn-comprar text-center px-2 py-1' onClick={() => quitarProducto(producto.id) }>Quitar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCar