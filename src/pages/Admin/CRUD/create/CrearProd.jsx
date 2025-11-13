import React, { useState, useEffect } from "react";

const CrearProd = () => {
  const [producto, setProducto] = useState({
    codigo_producto: "",
    id_categoria: "",
    nombre_producto: "",
    decripcion_producto: "",
    precio_producto: "",
    imagen_producto: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);

  const categoriasUrl = import.meta.env.VITE_PAGINA_ADMIN_CRUD_GET_CAT;

  // Cargar categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(categoriasUrl);
        if (!res.ok) throw new Error("Error al obtener categorías");

        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    fetchCategorias();
  }, [categoriasUrl]);

  // Manejar cambios de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Crear producto
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = import.meta.env.VITE_PAGINA_ADMIN_CRUD_CREAR_PROD;
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No tienes un token válido. Inicia sesión como administrador.");
      return;
    }

    // Validación de campos vacíos
    const camposObligatorios = [
      "codigo_producto",
      "id_categoria",
      "nombre_producto",
      "decripcion_producto",
      "precio_producto",
    ];

    for (const campo of camposObligatorios) {
      if (
        producto[campo] === "" ||
        producto[campo] === null ||
        producto[campo] === undefined
      ) {
        alert(`El campo "${campo.replace("_", " ")}" no puede estar vacío.`);
        return;
      }
    }

    if (isNaN(producto.precio_producto) || Number(producto.precio_producto) <= 0) {
      alert("El precio debe ser un número mayor a 0.");
      return;
    }

    const body = {
      codigo_producto: producto.codigo_producto,
      id_categoria: Number(producto.id_categoria),
      nombre_producto: producto.nombre_producto,
      decripcion_producto: producto.decripcion_producto,
      precio_producto: Number(producto.precio_producto),
      imagen_producto: producto.imagen_producto,
    };

    try {
      setLoading(true);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error al crear el producto");

      alert(`Producto creado con éxito: ${data.producto.nombre_producto}`);

      setProducto({
        codigo_producto: "",
        id_categoria: "",
        nombre_producto: "",
        decripcion_producto: "",
        precio_producto: "",
        imagen_producto: "",
      });
    } catch (error) {
      console.error(error);
      alert(`No se pudo crear el producto: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-brown">Crear Producto</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label">Código</label>
              <input
                type="text"
                className="form-control"
                placeholder="EJ: TT1111"
                name="codigo_producto"
                value={producto.codigo_producto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select
                name="id_categoria"
                className="form-control"
                value={producto.id_categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione categoría</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nombre_categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre_producto"
                placeholder="EJ: torta redonda chocolate"
                value={producto.nombre_producto}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio_producto"
                placeholder="EJ: 25000"
                value={producto.precio_producto}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label">Imagen (URL)</label>
              <input
                type="text"
                className="form-control"
                name="imagen_producto"
                placeholder="EJ: https://freepik.com/foto.jpg"
                value={producto.imagen_producto}
                onChange={handleChange}
              />
              {producto.imagen_producto && (
                <img
                  src={producto.imagen_producto}
                  alt="preview"
                  className="img-fluid mt-2 rounded"
                  style={{ maxHeight: "150px" }}
                />
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                rows="3"
                name="decripcion_producto"
                placeholder="EJ: Torta hecha con chocolate vegano"
                value={producto.decripcion_producto}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-comprar" disabled={loading}>
            {loading ? "Creando..." : "Crear Producto"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearProd;
