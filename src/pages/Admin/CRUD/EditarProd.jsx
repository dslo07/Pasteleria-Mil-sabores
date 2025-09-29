import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function EditarProd() {
  const { data: catalogo } = useFetch("/ApiProductos.json");
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState();

  // Cargar producto desde el catálogo
  useEffect(() => {
    if (catalogo) {
      const prod = catalogo.find(p => p.codigo == id);
      if (prod) setProducto(prod);
    }
  }, [id, catalogo]);

  if (!producto) return <p>Producto no encontrado</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  // Guardar cambios en localStorage

  //solo los guarda en el localstorage falta hacer que se renderice los cambios
  const handleGuardar = () => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const index = productos.findIndex(p => p.codigo === producto.codigo);

    if (index >= 0) {
      productos[index] = producto;
    } else {
      productos.push(producto);
    }

    localStorage.setItem("productos", JSON.stringify(productos));
    toast.success("Producto guardado correctamente");
    navigate("/admin/productos"); // Redirige a la lista de productos
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-4">Editar Producto</h2>
        <div>
          <button className=" btn btn-comprar" onClick={()=>navigate(-1)}> Volver</button>
        </div>
        
      </div>
      <div className="row g-4">
        {/* Columna izquierda: Imagen */}
        <div className="col-12 col-md-4">
          <div className="mb-3">
            <label className="form-label">URL de la Imagen</label>
            <input
              type="text"
              className="form-control"
              name="imagenURL"
              value={producto.imagenURL}
              onChange={handleChange}
            />
          </div>
          <img
            src={producto.imagenURL}
            alt={producto.nombre}
            className="img-fluid rounded border"
          />
        </div>

        {/* Columna derecha: Campos del producto */}
        <div className="col-12 col-md-8">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <input
              type="text"
              className="form-control"
              name="categoria"
              value={producto.categoria}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Precio</label>
            <input
              type="number"
              className="form-control"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Moneda</label>
            <input
              type="text"
              className="form-control"
              name="moneda"
              value={producto.moneda}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="descripcion"
              value={producto.descripcion}
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
