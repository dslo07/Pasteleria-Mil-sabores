import React, { useState, useEffect } from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import useFetch from "../../hooks/useFetch";
import CardProdTabla from "../../components/AdminCompo/CardProdTabla";
import { IoSearchSharp } from "react-icons/io5";

const AdminProd = () => {
  const url = `${import.meta.env.VITE_PAGINA_ADMIN_PROD}`;

  const { data: productos } = useFetch(url);
  const [listaProductos, setListaProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Inicializa la lista cuando llegan los productos
  useEffect(() => {
    if (productos) {
      setListaProductos(productos);
    }
  }, [productos]);
  
  // Manejar cambios en el input 
  const handleBuscar = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    if (!productos) return;

    //  Filtrado 
    const filtrados = productos.filter((p) => {
      const nombre = (p.nombre_producto || "").toLowerCase();
      const codigo = (p.codigo_producto || "").toString().toLowerCase();
      const categoria = (p.nombre_categoria || "").toLowerCase();

      return (
        nombre.includes(texto) ||
        codigo.includes(texto) ||
        categoria.includes(texto)
      );
    });

    setListaProductos(filtrados);
  };

  return (
    <CompoContent tipo={"Producto"}>
      <div className="container">
        <div className="row g-4">
          {/* Input  */}
          <div className="d-flex align-items-center border rounded mt-4 bg-white px-2">
            <IoSearchSharp className="me-2 text-muted" />
            <input
              type="text"
              placeholder="Buscar producto..."
              className="form-control border-0 shadow-none"
              value={busqueda}
              onChange={handleBuscar}
            />
          </div>

          {/* Renderizar de productos */}
          {listaProductos.length > 0 ? (
            listaProductos.map((producto) => (
              <div
                key={producto.id_producto || producto.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              >
                <CardProdTabla producto={producto} />
              </div>
            ))
          ) : (
            <p className="text-center mt-4 text-muted">
              No se encontraron productos.
            </p>
          )}
        </div>
      </div>
    </CompoContent>
  );
};

export default AdminProd;
