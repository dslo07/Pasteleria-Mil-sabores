import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch"


const EditarArticulo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [articulo, setArticulo] = useState({
    titulo_blogs: "",
    descripcion_blogs: "",
    imagen_blogs: "",
  });

  useEffect(() => {
    const fetchArticulo = async () => {
      try {
        const res = useFetch(`http://localhost:5174/api/blogs/${id}`);

        if (!res.ok) throw new Error("Error al cargar el artículo");

        const data = await res.json();

        if (!data || data.length === 0) throw new Error("Artículo no encontrado");

        const blog = data[0];

        setArticulo({
          titulo_blogs: blog.titulo_blogs,
          descripcion_blogs: blog.descripcion_blogs,
          // Usamos URL final si existe, o dejamos vacío
          imagen_blogs: blog.imagen || "",
        });
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    };

    fetchArticulo();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticulo({ ...articulo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5174/api/blogs/actualizar-blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(articulo),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al actualizar el artículo");
      }

      const data = await res.json();
      alert(`✅ Artículo actualizado con éxito: ${data.blog.titulo_blogs}`);
      navigate("/admin/blogs");
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Imagen (URL)</label>
          <input
            type="url"
            className="form-control"
            name="imagen_blogs"
            value={articulo.imagen_blogs}
            onChange={handleChange}
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
