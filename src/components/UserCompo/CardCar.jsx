import React, { useContext } from 'react';
import { carContext } from '../../context/carrito/carContext';
import { FaPlusCircle } from "react-icons/fa";
import { CgMathMinus } from "react-icons/cg";
import { useConvert } from '../../hooks/useConvert';

const CardCar = ({ producto }) => {
  const { controlCantidad, quitarProducto } = useContext(carContext);

  // Propiedades de producto desde tu API
  const imagenSrc = producto.imagen_producto || '/assets/no-image.png';
  const nombre = producto.nombre_producto;
  const categoria = producto.nombre_categoria;
  const descripcion = producto.decripcion_producto || '';
  const precio = producto.precio_producto;
  const codigo = producto.codigo_producto;
  const cantInCar = producto.cantInCar || 1; // por defecto 1 si no existe

  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imagenSrc} className="img-fluid rounded-start" alt={nombre} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fs-6">{categoria}</h5>
            <p className="fs-6">{descripcion}</p>

            <div className='d-flex justify-content-between'>
              <p className='spanCant rounded'>Cant: {cantInCar}</p>
              <span>{useConvert(precio)}</span>
            </div>

            <div className='d-flex justify-content-between mt-2'>
              <div className='d-flex gap-2'>
                <button
                  className='btn btn-comprar text-center px-2 py-1'
                  onClick={() => controlCantidad("suma", codigo)}
                >
                  <FaPlusCircle />
                </button>
                <button
                  className='btn btn-comprar text-center px-2 py-1'
                  onClick={() => controlCantidad("resta", codigo)}
                >
                  <CgMathMinus />
                </button>
              </div>

              <div>
                <button
                  className='btn btn-outline-danger text-center px-2 py-1'
                  onClick={() => quitarProducto(codigo)}
                >
                  Quitar
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CardCar;
