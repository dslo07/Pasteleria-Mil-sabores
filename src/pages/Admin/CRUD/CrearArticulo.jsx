import React, { useState } from "react";

const CrearArticulo = () => {
  const [articulo, setArticulo] = useState({
    titulo: "",
    descripcion: "",
    fecha: "",
    img: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticulo({
      ...articulo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Artículo creado:", articulo);
    alert(" Artículo creado con éxito");
    setArticulo({
      titulo: "",
      descripcion: "",
      fecha: "",
      img: "",
    });
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
            name="titulo"
            value={articulo.titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            rows="3"
            value={articulo.descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className="form-control"
            name="fecha"
            value={articulo.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input
            type="url"
            className="form-control"
            name="img"
            value={articulo.img}
            onChange={handleChange}
            required
          />
        </div>

        {articulo.img && (
          <div className="mb-3 text-center">
            <img
              src={articulo.img}
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
