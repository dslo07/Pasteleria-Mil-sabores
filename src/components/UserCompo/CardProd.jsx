import React, { useContext } from 'react';
import { carContext } from '../../context/carrito/carContext';
import { useConvert } from '../../hooks/useConvert';

function CardProd({ producto }) {
  const { agregarProd, productos } = useContext(carContext);

  // Revisar si el producto ya está en el carrito
  const enCarrito = productos.some(p => p.codigo === producto.codigo);

  return (
    <div className="card-Producto h-100 d-flex flex-column">
      <img
        src={producto.imagenURL}
        className="card-img-top border rounded-0"
        alt={producto.nombre}
      />
      <div className="card-body d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <span className="badge">{producto.categoria}</span>
          </div>
          <h5 className="fs-3">{producto.nombre}</h5>
        </div>
        <div className="mt-auto d-flex flex-column gap-2">
          <span className="badge-precio fw-medium">
            Precio: {useConvert(producto.precio)} {producto.moneda}
          </span>
          <div className="d-flex gap-2">
            <button className="btn btn-comprar w-100">
              Ver <span className="d-none d-md-flex">Producto</span>
            </button>
            <button
              className="btn btn-outline-danger py-1 px-2"
              title="Agregar al carrito"
              onClick={() => agregarProd(producto)}
              disabled={enCarrito} // opcional, evita agregar más veces
            >
              {enCarrito ? (
                <i className="bi bi-bag-check-fill color-red"></i> // icono cambiado
              ) : (
                <i className="bi bi-basket3-fill color-red"></i>  // icono normal
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProd;
