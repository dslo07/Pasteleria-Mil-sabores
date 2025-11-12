import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

function VistaBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = `${import.meta.env.VITE_PAGINA_USER_VISTA_BLOG}${id}`;

  const { data: blog, loading, error } = useFetch(API_URL);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Cargando artículo...</p>
      </div>
    );

  if (error || !blog)
    return (
      <div className="text-center py-5 text-danger">
        <p>Error al cargar el artículo o no existe.</p>
        <button className="btn btn-outline-dark mt-3" onClick={() => navigate("/blog")}>
          ← Volver al blog
        </button>
      </div>
    );

  return (
    <div className="container py-5">
        <div className="separador"></div>
      {/* Imagen principal */}
      {blog.imagen && (
        <div className="text-center mb-4">
          <img
            src={blog.imagen}
            alt={blog.titulo_blogs}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%" }}
          />
        </div>
      )}

      {/* Título */}
      <h1 className="fw-bold text-center mb-4">{blog.titulo_blogs}</h1>

      {/* Contenido */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "800px",
          lineHeight: "1.8",
          fontSize: "1.1rem",
          textAlign: "justify",
        }}
      >
        <p>{blog.descripcion_blogs}</p>
      </div>

      {/* Botón volver */}
      <div className="text-center mt-5">
        <button
          className="btn btn-comprar rounded-pill px-4"
          onClick={() => navigate("/blog")}
        >
          Volver al blog
        </button>
      </div>
    </div>
  );
}

export default VistaBlog;
