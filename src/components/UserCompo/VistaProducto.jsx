import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import ProductosMain from "./ProductosMain";
import Footer from "../../components/UserCompo/Footer";
import { carContext } from '../../context/carrito/carContext'

const VistaProducto = () => {
    const { agregarProd,productos } = useContext(carContext);
  
  const location = useLocation();
  const producto = location.state?.producto;
  const yaEnCarrito = productos.some((p) => p.codigo === producto.codigo);

  return (
    <>
      <div className="separador"></div>
      <div className="container py-5">
        <div className="row g-5">
          {/* Galería */}
          <div className="col-md-6">
            <img
              src={producto.imagenURL}
              alt={producto.nombre}
              className="img-fluid border rounded mb-3"
              width={"100%"}
            />
          </div>

          {/* Info del producto */}
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="h3">{producto.nombre}</h1>
              <span className="fs-4 fw-semibold text-muted">
                ${producto.precio.toLocaleString("es-CL")}
              </span>
            </div>

            <p className="text-muted">{producto.descripcion}</p>

            <button
              className={`btn w-100 ${yaEnCarrito ? "btn-success" : "btn-comprar"}`}
              onClick={() => !yaEnCarrito && agregarProd(producto)}
              disabled={yaEnCarrito}
            >
              {yaEnCarrito ? "producto agregado" : "Añadir al carrito"}
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
