import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditarArticulo = () => {
  const { id } = useParams(); // id del artículo
  const navigate = useNavigate();
  const [articulo, setArticulo] = useState({
    titulo_blogs: "",
    descripcion_blogs: "",
    imagen_blogs: "",
  });

  useEffect(() => {
    // Cargar datos del artículo
    const fetchArticulo = async () => {
      try {
        const res = await fetch(`http://localhost:5174/api/blogs/${id}`);
        if (!res.ok) throw new Error("Error al cargar el artículo");
        const data = await res.json();
        console.log(articulo);
        
        setArticulo({
          titulo_blogs: data[0].titulo_blogs,
          descripcion_blogs: data[0].descripcion_blogs,
          imagen_blogs: data[0].imagen_blogs,
        });
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };
    fetchArticulo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticulo({ ...articulo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5174/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(articulo),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al actualizar el artículo");
      }

      const data = await res.json();
      alert(`✅ Artículo actualizado con éxito: ${data.blog.titulo_blogs}`);
      navigate("/admin/blogs"); // Redirige a la lista de artículos
    } catch (error) {
      console.error(error);
      alert(`No se pudo actualizar el artículo: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Editar Artículo</h3>
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
            Actualizar Artículo
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarArticulo;
