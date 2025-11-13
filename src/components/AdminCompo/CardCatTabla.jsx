import React from "react";
import { Link } from "react-router-dom";
import { FaTags } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import useMutation from "../../hooks/useMutation";
import CatCardSKL from "../../components/skeletons/CatCardSKL"; // Importar el skeleton

const CardCatTabla = ({ categoria, onDelete, loading }) => {
  const { execute, loading: mutateLoading } = useMutation();
  const { id_categoria, nombre_categoria } = categoria;

  const eliminarCat = async () => {
    const num = Math.floor(Math.random() * 900) + 100;
    const confirmacion = prompt(`Ingrese el número ${num} para confirmar la eliminación:`);

    const url = `${import.meta.env.VITE_COMPONENTE_ADMIN_ARTICULO_CARD}${id_categoria}`;

    if (confirmacion !== String(num)) {
      alert("No se eliminó la categoría.");
      return;
    }

    try {
      const res = await execute(url, "DELETE");

      if (res?.msg) {
        alert(`${res.msg}`);
        window.location.reload();
      } else {
        alert("No se pudo eliminar la categoría.");
      }
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("Error al intentar eliminar la categoría.");
    }
  };

  // Si está cargando, mostramos el skeleton
  if (loading) {
    return <CatCardSKL />;
  }

  return (
    <div
      className="cat-card border rounded shadow-sm bg-white my-2 p-3"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* Lado izquierdo: ícono + nombre */}
      <div
        className="d-flex align-items-center flex-grow-1"
        style={{ minWidth: "200px" }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-circle bg-light flex-shrink-0"
          style={{ width: "45px", height: "45px" }}
        >
          <FaTags size={22} className="text-secondary" />
        </div>
        <div
          className="ms-3 text-truncate"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          <h5 className="mb-0 text-truncate">{nombre_categoria}</h5>
          <p className="text-muted mb-0 small">ID: {id_categoria}</p>
        </div>
      </div>

      {/* Lado derecho: botones */}
      <div
        className="d-flex align-items-center justify-content-end gap-2 flex-wrap"
        style={{ minWidth: "160px" }}
      >
        <Link to={`/admin/categorias/editar-categoria/${id_categoria}`}>
          <button
            className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
            style={{
              fontSize: "0.9rem",
              borderRadius: "0.5rem",
              whiteSpace: "nowrap",
            }}
          >
            <CiEdit size={18} /> Editar
          </button>
        </Link>

        <button
          className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
          style={{
            fontSize: "0.9rem",
            borderRadius: "0.5rem",
            whiteSpace: "nowrap",
          }}
          onClick={eliminarCat}
          disabled={mutateLoading}
        >
          <i className="bi bi-trash-fill"></i>{" "}
          {mutateLoading ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
};

export default CardCatTabla;
