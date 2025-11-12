import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import useMutation from "../../../../hooks/useMutation";

const EditarCat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_PAGINA_ADMIN_CRUD_EDITAR_CAT}`;

  const { data: categoria, loading: loadingFetch, error } = useFetch(`${url}${id}`);

  const { execute, loading: loadingMutation } = useMutation();
  const [nombre, setNombre] = useState("");

  // Setear nombre cuando llegan los datos
  useEffect(() => {
    if (categoria && categoria.nombre_categoria) {
      setNombre(categoria.nombre_categoria);
    }
  }, [categoria]);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert("El nombre no puede estar vacío.");
      return;
    }

    try {
      const res = await execute(
        `http://localhost:5174/api/categorias/actualizar-categoria/${id}`,
        "PUT",
        { nombre }
      );

      if (res?.msg) {
        alert("✅ Categoría actualizada correctamente.");
        navigate("/admin/categorias");
      } else {
        alert("❌ No se pudo actualizar la categoría.");
      }
    } catch (err) {
      console.error("Error al actualizar la categoría:", err);
      alert("Hubo un problema al guardar los cambios.");
    }
  };

  if (loadingFetch) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <p className="text-muted">Cargando categoría...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h5 className="text-danger">Error al cargar la categoría.</h5>
        <button className="btn btn-secondary mt-3" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div
      className="container py-5"
      style={{
        maxWidth: "600px",
      }}
    >
      <h2 className="mb-4 fw-semibold text-center">Editar Categoría</h2>

      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 bg-white shadow-sm"
      >
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label fw-medium">
            Nombre de la categoría
          </label>
          <input
            id="nombre"
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Tortas cuadradas"
          />
        </div>

        <div className="d-flex justify-content-between flex-wrap gap-2 mt-4">
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => navigate(-1)}
            disabled={loadingMutation}
          >
            Volver
          </button>

          <button
            type="submit"
            className="btn btn-comprar"
            disabled={loadingMutation}
          >
            {loadingMutation ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCat;
