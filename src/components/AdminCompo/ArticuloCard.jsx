import React from 'react';
import { Link } from 'react-router-dom';
import useMutation from "../../hooks/useMutation";
import toast from 'react-hot-toast';

function ArticuloCard({ blog }) {
  const { execute, isLoading, error } = useMutation();
const url = `${import.meta.env.VITE_COMPONENTE_ADMIN_ARTICULO_CARD}${blog.id_blogs}`;

  const eliminarArticulo = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este artículo?")) return;

    try {
      const token = localStorage.getItem("token");
      
      const res = await execute(
        url,
        "DELETE",
        null,
        token
      );

      if (res && res.msg) {
        toast.success("Artículo eliminado correctamente");
        window.location.reload(); 
      } else {
        toast.error(error || "Error al eliminar el artículo");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error inesperado al eliminar el artículo");
    }
  };

  return (
    <div
      className="mb-4 shadow-sm p-3 rounded"
      style={{
        border: "1px solid #e0e0e0",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
      }}
    >
      {blog.imagen && (
        <img
          src={blog.imagen}
          className="w-100 rounded mb-3"
          alt={blog.titulo_blogs}
          style={{
            height: "220px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      )}

      <div>
        <h5 className="fw-bold">{blog.titulo_blogs}</h5>
        <p className="text-muted">{blog.descripcion_blogs}</p>

        <div className="d-flex gap-2 mt-3">
          <Link
            to={`/admin/blog/editar-blog/${blog.id_blogs}`}
            className="text-decoration-none"
          >
            <button className="btn btn-comprar rounded-pill px-3 py-1">
              Editar
            </button>
          </Link>

          <button
            className="btn btn-danger rounded-pill px-3 py-1"
            onClick={eliminarArticulo}
            disabled={isLoading}
          >
            {isLoading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ArticuloCard;
