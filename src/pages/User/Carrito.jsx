import React, { useState, useContext } from 'react';
import CarManager from '../../components/UserCompo/CarManager';
import { carContext } from '../../context/carrito/carContext';
import { useConvert } from '../../hooks/useConvert';

const Carrito = () => {
  const { total, costo, cupon, comprar, aplicarCupon, vaciarCarrito } = useContext(carContext);
  const [codigoCupon, setCodigoCupon] = useState("");

  return (
    <section>
      <div className="separador"></div>
      <div className="container">
        <h1>Mi carrito de compras</h1>
        <div className="row d-flex">
          {/* Lista de productos */}
          <div className="col-12 col-md-6 overflow-auto custom-scroll p-2" style={{ maxHeight: "400px" }}>
            <CarManager />
              {total !== 0 && (
                <button className='btn btn-danger p-2 rounded' onClick={vaciarCarrito}>
                  Vaciar Carrito
                </button>
              )}
          </div>

          {/* Total */}
          <div className="col-12 col-md-6 mt-3 mt-md-0 ">
            <h1>Resumen de la compra</h1>
            <div>
              <div className='d-flex justify-content-between py-2 border-bottom border-2'>
                <p className='m-0'>Total de productos:</p>
                <span>{total}</span>
              </div>
              <div className='d-flex justify-content-between py-2 border-bottom border-2'>
                <p className='m-0'>Descuento aplicado:</p>
                <span>{useConvert(cupon.descuento)}</span>
              </div>
              <div className='d-flex justify-content-between py-2 border-bottom border-2'>
                <p className='m-0'>Total de la compra:</p>
                <span>{useConvert(costo)}</span>
              </div>
              <div className='d-flex justify-content-between py-2 border-bottom border-2'>
                <p className='m-0'>Aplicar cupon:</p>
                <div className='d-flex gap-2'>
                  <input
                    type="text"
                    placeholder='Ingrese su cupon'
                    onChange={(e) => setCodigoCupon(e.target.value)}
                  />
                  <button
                    className="btn btn-comprar rounded"
                    onClick={() => aplicarCupon(codigoCupon)}
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              <div className='w-100 mt-3'>
                <button className='btn btn-comprar p-2 rounded' onClick={comprar}>Comprar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carrito;
