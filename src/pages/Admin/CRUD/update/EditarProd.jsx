import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

function EditarProd() {
  const { codigo_producto } = useParams();
  const navigate = useNavigate();

  //  Cargar producto desde la API
  const { data, loading, error } = useFetch(
    `http://localhost:5174/api/productos/${codigo_producto}`
  );

  // Cargar todas las categorías
  const { data: categorias = [], loading: loadingCats, error: errorCats } = useFetch(
    "http://localhost:5174/api/categorias"
  );

  // Estado local 
  const [producto, setProducto] = useState(null);

  // Actualizar el estado cuando llega la data
  useEffect(() => {
    if (data) {
      setProducto({
        ...data,
        imagen_producto: data.imagen_producto || "",
      });
    }
  }, [data]);

  if (loading || loadingCats) return <p>Cargando...</p>;
  if (error || errorCats) return <p>Error al cargar datos</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardar = async () => {
    if (!producto.nombre_producto || !producto.id_categoria) {
      toast.error("Completa los campos requeridos");
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem("token"));

      const response = await fetch(
        `http://localhost:5174/api/productos/${producto.codigo_producto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify({
            nombre_producto: producto.nombre_producto,
            descripcion_producto: producto.descripcion_producto, // ✅ corregido
            precio_producto: Number(producto.precio_producto),
            imagen_producto: producto.imagen_producto,
            id_categoria: Number(producto.id_categoria),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al actualizar");

      toast.success(" Producto actualizado correctamente");
      navigate("/admin/productos");
    } catch (err) {
      console.error("Error al guardar producto:", err);
      toast.error("❌ No se pudo guardar el producto");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="mb-4">Editar Producto</h2>
        <button className="btn btn-comprar" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <div className="row g-4">
        {/* Imagen */}
        <div className="col-12 col-md-4">
          <div className="mb-3">
            <label className="form-label">Imagen (base64 o URL)</label>
            <input
              type="text"
              className="form-control"
              name="imagen_producto"
              value={producto.imagen_producto}
              onChange={handleChange}
            />
          </div>
          {producto.imagen_producto && (
            <img
              src={
                producto.imagen_producto.startsWith("data:image")
                  ? atob(producto.imagen_producto.split(",")[1]) // decodifica la URL
                  : producto.imagen_producto
              }
              alt={producto.nombre_producto}
              className="img-fluid rounded border"
            />
          )}
        </div>

        {/* Campos */}
        <div className="col-12 col-md-8">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre_producto"
              value={producto.nombre_producto}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select
              className="form-control"
              name="id_categoria"
              value={producto.id_categoria}
              onChange={handleChange}
            >
              <option value="">Seleccionar categoría</option>
              {categorias.map((cat) => (
                <option key={cat.id_categoria} value={cat.id_categoria}>
                  {cat.nombre_categoria}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              name="precio_producto"
              value={producto.precio_producto}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="descripcion_producto" // ✅ corregido
              value={producto.descripcion_producto || ""}
              onChange={handleChange}
              rows={5}
            />
          </div>

          <button className="btn btn-comprar" onClick={handleGuardar}>
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarProd;
