import React, { useState, useEffect} from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import useFetch from "../../hooks/useFetch";
import CardProdTabla from "../../components/AdminCompo/CardProdTabla";


const AdminProd = () => {
  const { data: productos } = useFetch("http://localhost:5174/api/productos");
  const [listaProductos, setListaProductos] = useState([]);

  // Inicializar el estado con los productos del fetch
  useEffect(() => {
    if (productos) {
      setListaProductos(productos);
    }
  }, [productos]);



  return (
    <>
      <CompoContent tipo={"Producto"}>
        <div className="container">
          <div className="row g-4">
            {listaProductos?.map((producto) => (
              <div
                key={producto.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              >
                <CardProdTabla
                  producto={producto}
                />
              </div>
            ))}
          </div>
        </div>
      </CompoContent>
    </>
  );
};

export default AdminProd;
