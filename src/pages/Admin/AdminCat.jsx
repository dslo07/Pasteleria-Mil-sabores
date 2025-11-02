import React, { useState, useEffect } from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import useFetch from "../../hooks/useFetch";
import CardCatTabla from "../../components/AdminCompo/CardCatTabla";
import { IoSearchSharp } from "react-icons/io5";

const AdminCat = () => {
  const { data: categorias, loading, error } = useFetch("http://localhost:5174/api/categorias");
  const [listaCategorias, setListaCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  
  useEffect(() => {
    if (categorias) setListaCategorias(categorias);
  }, [categorias]);

  //  Filtrado 
  const handleBuscar = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    if (!categorias) return;

    const filtradas = categorias.filter((c) =>
      (c.nombre_categoria || "").toLowerCase().includes(texto)
    );

    setListaCategorias(filtradas);
  };

  //  Manejo de estados de carga y error
  if (loading) return <p className="text-center mt-5">Cargando categorías...</p>;
  if (error) return <p className="text-center text-danger mt-5">Error: {error}</p>;

  return (
    <CompoContent tipo="Categoria">
      <div className="container">
        {/* Input  */}
        <div className="d-flex align-items-center border rounded mt-4 bg-white px-2 py-1">
          <IoSearchSharp className="me-2 text-muted" />
          <input
            type="text"
            placeholder="Buscar categoría..."
            className="form-control border-0 shadow-none"
            value={busqueda}
            onChange={handleBuscar}
          />
        </div>

        {/* Lista  */}
        <div className="row g-3 mt-3">
          {listaCategorias.length > 0 ? (
            listaCategorias.map((categoria) => (
              <div
                key={categoria.id_categoria}
                className="col-12 col-md-6 col-lg-4 d-flex"
              >
                <CardCatTabla categoria={categoria} />
              </div>
            ))
          ) : (
            <p className="text-center mt-4 text-muted">
              No se encontraron categorías.
            </p>
          )}
        </div>
      </div>
    </CompoContent>
  );
};

export default AdminCat;
