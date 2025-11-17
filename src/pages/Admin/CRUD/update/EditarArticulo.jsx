import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useFetch from "../../../../hooks/useFetch";
import useMutation from "../../../../hooks/useMutation";

function EditarArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_PAGINA_ADMIN_CRUD_EDITAR_ART}`;
  const url_Blog = `${import.meta.env.VITE_PAGINA_ADMIN_CRUD_EDITAR_ART_BLOG}`;

  const { data: articulo, loading, error } = useFetch(`${url}${id}`);
  const { execute, isLoading } = useMutation();

  const [formData, setFormData] = useState({
    titulo_blogs: "",
    descripcion_blogs: "",
    imagen_blogs: "",
  });

  useEffect(() => {
    if (articulo) {
      setFormData({
        titulo_blogs: articulo.titulo_blogs || "",
        descripcion_blogs: articulo.descripcion_blogs || "",
        imagen_blogs: articulo.imagen_blogs || "",
      });
    }
  }, [articulo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("No se encontró el token de autenticación");
      return;
    }

    try {
      const result = await execute(
        `${url_Blog}${id}`,
        "PUT",
        formData,
        token
      );

      if (result) {
        toast.success("Artículo actualizado correctamente");
        navigate("/admin/blog");
      } else {
        toast.error("No se pudo actualizar el artículo");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error inesperado al actualizar el artículo");
    }
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
        <p className="mt-2">Cargando artículo...</p>
      </div>
    );

  if (error)
    return <p className="text-danger text-center">Error al cargar el artículo</p>;

  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Editar artículo</h2>

      <form onSubmit={handleSubmit} className="row g-4">
        {/* COLUMNA IZQUIERDA */}
        <div className="col-12 col-md-6">
          <div className="mb-4">
            <label className="form-label fw-semibold">Título</label>
            <input
              type="text"
              name="titulo_blogs"
              value={formData.titulo_blogs}
              onChange={handleChange}
              className="form-control p-3 shadow-sm"
              placeholder="Escribe el título..."
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Descripción</label>
            <textarea
              name="descripcion_blogs"
              value={formData.descripcion_blogs}
              onChange={handleChange}
              className="form-control p-3 shadow-sm"
              rows="8"
              placeholder="Describe el contenido..."
              style={{ resize: "none", height: "240px" }}
              required
            ></textarea>
          </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="col-12 col-md-6 text-center">
          <div className="mb-4">
            <label className="form-label fw-semibold">Imagen actual / URL nueva</label>
            <div className="d-flex justify-content-center align-items-center mb-3">
              {formData.imagen_blogs ? (
                <img
                  src={formData.imagen_blogs}
                  alt="Vista previa"
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "240px",
                    borderRadius: "15px",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "350px",
                    height: "240px",
                    borderRadius: "15px",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#777",
                  }}
                >
                  Sin imagen
                </div>
              )}
            </div>

            {/* Input de URL */}
            <input
              type="url"
              name="imagen_blogs"
              value={formData.imagen}
              onChange={handleChange}
              className="form-control shadow-sm"
              placeholder="Pega aquí la URL de la imagen..."
              style={{
                borderRadius: "10px",
                border: "1px solid #ccc",
                height: "50px",
              }}
              required
            />
          </div>
        </div>

        {/* BOTONES */}
        <div className="col-12 d-flex justify-content-between align-items-center mt-4 flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-outline-success rounded-pill px-4 py-2"
            onClick={() => navigate(-1)}
          >
            Volver
          </button>

          <button
            type="submit"
            onClick={()=>console.log(formData)}
            className="btn btn-comprar rounded-pill px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditarArticulo;
