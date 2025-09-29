import { useConvert } from '../../hooks/useConvert';
import { Link } from 'react-router-dom';

function CardProdTabla({ producto, eliminarProd }) {
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
          <h5 >{producto.nombre}</h5>
        </div>
        <div className="mt-auto d-flex flex-column gap-2">
          <span className="badge-precio fw-medium">
            Precio: {useConvert(producto.precio)} {producto.moneda}
          </span>
          <div className="d-flex gap-2">
            <Link to={`/admin/productos/editar-producto/${producto.codigo}`} className='text-decoration-none'>
              <button className="btn btn-comprar w-100">
                Editar 
              </button>
            </Link>
            <button
              className="btn btn-outline-danger py-1 px-2"
              title="Borrar producto"
              onClick={() => eliminarProd(producto.codigo)}
            >
              <i className="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProdTabla;
