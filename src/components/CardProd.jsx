import React from 'react';

function CardProd({ producto }) {
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
          <h5 className="fs-3 fw-bold">{producto.nombre}</h5>
        </div>
        <div className="mt-auto d-flex flex-column gap-2">
          <span className="badge-precio fw-medium">
            Precio: ${producto.precio} {producto.moneda}
          </span>
          <div className="d-flex gap-2">
            <button className="btn btn-comprar w-100 cursor-pointer">Ver Producto</button>
            <button className="btn btn-outline-danger py-1 px-2">
              <i className="bi bi-basket3-fill color-red"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProd;
