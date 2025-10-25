import React, { useState } from "react";

const CrearArticulo = () => {
  const [articulo, setArticulo] = useState({
    titulo_blogs: "",
    descripcion_blogs: "",
    imagen_blogs: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticulo({
      ...articulo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5174/api/blogs/crear-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articulo),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear el artículo");
      }

      const data = await res.json();
      alert(`✅ Artículo creado con éxito: ${data.blog.titulo_blogs}`);

      // Reset formulario
      setArticulo({
        titulo_blogs: "",
        descripcion_blogs: "",
        imagen_blogs: "",
      });
    } catch (error) {
      console.error(error);
      alert(`No se pudo crear el artículo: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Crear Artículo</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            name="titulo_blogs"
            value={articulo.titulo_blogs}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion_blogs"
            rows="3"
            value={articulo.descripcion_blogs}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input
            type="url"
            className="form-control"
            name="imagen_blogs"
            value={articulo.imagen_blogs}
            onChange={handleChange}
            required
          />
        </div>

        {articulo.imagen_blogs && (
          <div className="mb-3 text-center">
            <img
              src={articulo.imagen_blogs}
              alt="Vista previa"
              className="img-fluid rounded shadow-sm"
              style={{ maxHeight: "200px", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="text-end">
          <button type="submit" className="btn btn-comprar">
            Guardar Artículo
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearArticulo;
