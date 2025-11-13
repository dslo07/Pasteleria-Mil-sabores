import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ProductosMain from "./ProductosMain";
import { carContext } from "../../context/carrito/carContext";

const VistaProducto = () => {
  
  const { agregarProd, productos } = useContext(carContext);
  const { codigo_producto } = useParams();
  const location = useLocation();

  // si viene desde navigate, el producto llega por state
  const productoInicial = location.state?.producto || null;

  const [producto, setProducto] = useState(productoInicial);

  // revisar si el producto ya está en el carrito
  const yaEnCarrito = productos.some(
    (p) => p.codigo_producto === producto?.codigo_producto
  );

  // si el usuario entra directamente por la URL, traer el producto desde el backend
  useEffect(() => {
    if (!producto) {
      fetch(`/api/producto/${codigo_producto}`)
        .then((res) => res.json())
        .then((data) => setProducto(data))
        .catch((err) => console.error("Error al cargar producto:", err));
    }
  }, [codigo_producto, producto]);

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <p>Cargando producto...</p>
      </div>
    );
  }

  return (
    <>
      <div className="separador"></div>
      <div className="container py-5">
        <div className="row g-5">
          {/* Galería */}
          <div className="col-md-6">
            <img
              src={producto.imagen_producto}
              alt={producto.nombre_producto}
              className="img-fluid border rounded mb-3"
              width={"100%"}
            />
          </div>

          {/* Info del producto */}
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="h3">{producto.nombre_producto}</h1>
              <span className="fs-4 fw-semibold text-muted">
                ${producto.precio_producto?.toLocaleString("es-CL")}
              </span>
            </div>

            <p className="text-muted">{producto.decripcion_producto}</p>

            <button
              className={`btn w-100 ${
                yaEnCarrito ? "btn-success" : "btn-comprar"
              }`}
              onClick={() => !yaEnCarrito && agregarProd(producto.codigo_producto)}
              disabled={yaEnCarrito}
            >
              {yaEnCarrito ? "Producto agregado" : "Añadir al carrito"}
            </button>
          </div>
        </div>

        {/* Productos relacionados */}
        <ProductosMain />
      </div>
    </>
  );
};

export default VistaProducto;
