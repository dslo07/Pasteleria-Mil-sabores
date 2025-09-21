import React from "react";
import { FaUsers } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const CardBlogTabla = () => {

  return (
        <div className="border rounded shadow-sm p-3 bg-white">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">{blog.titulo}</h5>
        <span
          className={`badge ${
            blog.estado === "Publicado" ? "bg-success" : "bg-secondary"
          }`}
        >
          {blog.estado}
        </span>
      </div>

      {/* Fecha */}
      <p className="text-muted mb-2">{blog.fecha}</p>

      {/* Imagen */}
      <img
        src={blog.imagen}
        alt={blog.titulo}
        className="img-fluid rounded mb-2"
      />

      {/* Descripción */}
      <p className="mb-2">{blog.descripcion}</p>

      {/* Autor */}
      <p className="text-muted mb-2">Por {blog.autor}</p>

      {/* Categorías */}
      <div className="mb-2">
        {blog.categorias.map((cat, index) => (
          <span key={index} className="badge bg-light text-dark me-1">
            {cat}
          </span>
        ))}
      </div>

      {/* Botones */}
      <div className="d-flex gap-2">
        <button className="btn btn-outline-primary btn-sm">Editar</button>
        <button className="btn btn-outline-danger btn-sm">Eliminar</button>
      </div>
    </div>
  );
};

export default CardBlogTabla;
