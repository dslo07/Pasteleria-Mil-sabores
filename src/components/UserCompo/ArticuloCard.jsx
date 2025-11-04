import React from 'react';
import { Link } from 'react-router-dom';
import useMutation from "../../hooks/useMutation"
import toast from 'react-hot-toast';

function ArticuloCard({ articulo }) {
  const { execute, isLoading, error } = useMutation();

  const eliminarArticulo = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este artículo?")) return;

    try {
      const token = localStorage.getItem("token");
      const result = await execute(
        `http://localhost:5174/api/blogs/borrar-blog/${articulo.id_blogs}`,
        "DELETE",
        null,
        token
      );

      if (result) {
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
    <div className="card mb-3">
      {articulo.imagen && (
        <img
          src={articulo.imagen} // usamos la URL directa
          className="card-img-top h-50"
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
