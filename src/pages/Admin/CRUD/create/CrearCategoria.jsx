import React, { useState } from "react";

const CrearCategoria = () => {
  const [categoria, setCategoria] = useState({
    nombre: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoria.nombre.trim()) {
      alert("⚠️ El nombre de la categoría es obligatorio.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5174/api/categorias/crear-categoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al crear la categoría");

      alert(`✅ Categoría creada con éxito: ${data.categoria.nombre_categoria}`);

      // Reset del formulario
      setCategoria({ nombre: "" });
    } catch (error) {
      console.error(error);
      alert(`❌ No se pudo crear la categoría: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Crear Categoría</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label fw-semibold">Nombre de la categoría</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={categoria.nombre}
            onChange={handleChange}
            placeholder="Ej: Tortas cuadradas"
            required
          />
        </div>

        <div className="text-end">
          <button
            type="submit"
            className="btn btn-comprar"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Categoría"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearCategoria;
