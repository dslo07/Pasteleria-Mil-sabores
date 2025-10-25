import { useConvert } from '../../hooks/useConvert';
import { Link } from 'react-router-dom';
import AlertModal from '../../components/AlerModal'
import { useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';

function CardProdTabla({ producto }) {

const eliminarProd = async (codigo) => {
  const respuesta = prompt(`Ingrese el código del producto para confirmar eliminación: "${codigo}"`);

  if (!respuesta) return;
  if (respuesta !== codigo) {
    alert("Código incorrecto. No se eliminó el producto.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:5174/api/productos/borrar-producto/${codigo}`, {
      method: 'DELETE'
    });

    if (!res.ok) {
      throw new Error(`Error al eliminar el producto: ${res.statusText}`);
    }

    alert(`Producto con código "${codigo}" eliminado correctamente.`);
    
    window.location.reload()
  } catch (error) {
    console.error(error);
    alert(error);
  }
};


  return (
    <div className="card-Producto h-100 d-flex flex-column">
      
      <img
        src={producto.imagen_producto}
        className="card-img-top border rounded-0"
        alt={producto.nombre_producto}
      />
      <div className="card-body d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <span className="badge">{producto.nombre_categoria}</span>
          </div>
          <h5 >{producto.nombre_producto}</h5>
        </div>
        <div className="mt-auto d-flex flex-column gap-2">
          <span className="badge-precio fw-medium">
            Precio: {useConvert(producto.precio_producto)} {producto.moneda}
          </span>

          <div className="d-flex gap-2">
            <Link to={`/admin/productos/editar-producto/${producto.codigo_producto}`} className='text-decoration-none'>
              <button className="btn btn-comprar w-100">
                Editar 
              </button>
            </Link>
            <button
              className="btn btn-outline-danger py-1 px-2"
              title="Borrar producto"
              onClick={() => eliminarProd(producto.codigo_producto)}
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
