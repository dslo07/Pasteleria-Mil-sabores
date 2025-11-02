import React from 'react';
import { Link } from 'react-router-dom';

function ArticuloCard({ articulo }) {
  return (
    <div className="card mb-3">
      {articulo.imagen && (
        <img
          src={articulo.imagen}
          className="card-img-top"
          alt={articulo.titulo_blogs}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{articulo.titulo_blogs}</h5>
        <p className="card-text">{articulo.descripcion_blogs}</p>

        <div className="d-flex gap-2">
          <Link
            to={`/admin/blog/editar-blog/${articulo.id_blogs}`}
            className="text-decoration-none"
          >
            <button className="btn btn-comprar rounded">Editar</button>
          </Link>
          <button
            className="btn btn-danger rounded"
            onClick={() => console.log('Eliminar', articulo.id_blogs)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticuloCard;
