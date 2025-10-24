import React, { useContext } from 'react';
import { carContext } from '../../context/carrito/carContext';
import { useConvert } from '../../hooks/useConvert';
import { useNavigate } from 'react-router-dom';
function CardProd({ producto }) {
  const { agregarProd, productos } = useContext(carContext);
  const navigate = useNavigate();
  // Revisar si el producto ya está en el carrito
  const enCarrito = productos.some(p => p.codigo === producto.codigo);

  // Manejo de imagen (evita que rompa si no hay imagen)
  const imagenSrc = producto.imagen_producto
    ? producto.imagen_producto // viene en base64 desde el backend
    : '/assets/no-image.png'; // imagen por defecto local
  return (
    <div className="card-Producto h-100 d-flex flex-column">
      <img
        src={imagenSrc}
        className="card-img-top border rounded-0 object-fit-cover"
        alt={producto.nombre_producto}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <span className="badge">{producto.nombre_categoria}</span>
          </div>
          <h5 className="fs-3">{producto.nombre_producto}</h5>
        </div>
        <div className="mt-auto d-flex flex-column gap-2">
          <span className="badge-precio fw-medium">
            Precio: {useConvert(producto.precio_producto)} {producto.moneda}
          </span>
          <div className="d-flex gap-2">
            <button className="btn btn-comprar w-100" onClick={()=>navigate(`/producto/${producto.codigo_producto}`, {state:{producto}} )}>
              Ver <span className="d-none d-md-flex">Producto</span>
            </button>
            <button
              className="btn btn-outline-danger py-1 px-2"
              title="Agregar al carrito"
              onClick={() => agregarProd(producto)}
            >
                <i className="bi bi-basket3-fill color-red"></i>  
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProd;
