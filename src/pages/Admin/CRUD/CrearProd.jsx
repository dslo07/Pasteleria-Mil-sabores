import React, { useState } from "react";

const CrearProd = () => {
  const [producto, setProducto] = useState({
    codigo: "",
    categoria: "",
    nombre: "",
    precio: "",
    moneda: "CLP",
    imagenURL: "",
    descripcion: "",
    cantInCar: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Producto creado:", producto);
    alert("✅ Producto creado con éxito");
    setProducto({
      codigo: "",
      categoria: "",
      nombre: "",
      precio: "",
      moneda: "CLP",
      imagenURL: "",
      descripcion: "",
      inCar: false,
      cantInCar: 0,
    });
  };

  return (
    <div className="container mt-4">
      <h3 className=" text-brown">Crear Producto</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm ">
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label">Código</label>
              <input
                type="text"
                className="form-control"
                placeholder="EJ: TT1111"
                name="codigo"
                value={producto.codigo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Categoría</label>
              <select name="categoria" id="catSelect" className="form-control">
                <option value="">cat1 </option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                placeholder="EJ: torta redonda chocolate"
                value={producto.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                placeholder="EJ: 25000"
                value={producto.precio}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label">Moneda</label>
              <select
                className="form-select"
                name="moneda"
                value={producto.moneda}
                onChange={handleChange}
              >
                <option value="CLP">CLP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Imagen (URL)</label>
              <input
                type="text"
                className="form-control"
                name="imagenURL"
                placeholder="EJ: freepik.com/foto-de-pastel-rosa"
                value={producto.imagenURL}
                onChange={handleChange}
              />
              {producto.imagenURL && (
                <img
                  src={producto.imagenURL}
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
                name="descripcion"
                placeholder="EJ: Torta hecha con chocolate vegano"
                value={producto.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="text-end">
          <button type="submit" className="btn btn-comprar">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearProd;
