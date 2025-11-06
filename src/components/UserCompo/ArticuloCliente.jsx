import React from "react";
import { Link } from "react-router-dom";

function ArticuloCliente({ blog }) {
  return (
    <div
      className="card h-100 border-0 shadow-sm hover-shadow transition-all"
      style={{ transition: "all 0.3s ease" }}
    >
      {/* Imagen */}
      {blog.imagen && (
        <img
          src={blog.imagen}
          alt={blog.titulo_blogs}
          className="card-img-top"
          style={{
            height: "220px",
            objectFit: "cover",
          }}
        />
      )}

      {/* Contenido */}
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title">{blog.titulo_blogs}</h5>
          <p className="card-text text-muted">
            {blog.descripcion_blogs.length > 120
              ? blog.descripcion_blogs.slice(0, 120) + "..."
              : blog.descripcion_blogs}
          </p>
        </div>

        {/* Botón */}
        <div className="text-end mt-auto">
          <Link
            to={`/blog/${blog.id_blogs}`}
            className="btn btn-comprar rounded-pill px-3 py-1"
          >
            Ver artículo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ArticuloCliente;
