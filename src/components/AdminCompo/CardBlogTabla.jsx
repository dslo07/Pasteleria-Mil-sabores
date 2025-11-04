import React from "react";

const CardBlogTabla = ({ blog }) => {







  return (
    
    <div className="border rounded shadow-sm p-3 bg-white">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{blog.titulo_blogs}</h5>
      </div>

      {/* Imagen */}
      {blog.imagen && (
        <img
          src={blog.imagen}
          alt={blog.titulo_blogs}
          className="img-fluid rounded mb-2"
        />
      )}

      {/* Descripción */}
      <p className="mb-2">{blog.descripcion_blogs}</p>

      {/* Botones */}
      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary btn-sm">Editar</button>
        <button className="btn btn-outline-danger btn-sm" onClick={()=>eliminarArticulo}>Eliminar</button>
      </div>
    </div>
  );
};

export default CardBlogTabla;
