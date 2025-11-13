import React, { useState, useEffect } from "react";
import CompoContent from "../../components/AdminCompo/CompoContent";
import useFetch from "../../hooks/useFetch";
import CardCatTabla from "../../components/AdminCompo/CardCatTabla";
import CatCardSKL from "../../components/skeletons/CatCardSKL"; // Importar el esqueleto
import { IoSearchSharp } from "react-icons/io5";

const AdminCat = () => {
  const url = `${import.meta.env.VITE_PAGINA_ADMIN_CAT}`;

  const { data: categorias, loading, error } = useFetch(url);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Actualizar lista de categorías cuando cambian los datos
  useEffect(() => {
    if (categorias) setListaCategorias(categorias);
  }, [categorias]);

  // Filtrar las categorías según la búsqueda
  const handleBuscar = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    if (!categorias) return;

    // Filtrado de las categorías
    const filtradas = categorias.filter((c) =>
      (c.nombre_categoria || "").toLowerCase().includes(texto)
    );

    setListaCategorias(filtradas);
  };

  // Manejo de estados de carga y error
  if (error) return <p className="text-center text-danger mt-5">Error: {error}</p>;

  return (
    <CompoContent tipo="Categoria">
      <div className="container">
        {/* Input de búsqueda */}
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

        {/* Lista de categorías */}
        <div className="row g-3 mt-3">
          {loading ? (
            // Si se está cargando, mostrar los skeletons en lugar de las tarjetas
            Array(8)
              .fill()
              .map((_, index) => (
                <div key={index} className="col-12 col-md-6 col-lg-4 d-flex">
                  <CatCardSKL /> {/* Mostrar el esqueleto */}
                </div>
              ))
          ) : listaCategorias.length > 0 ? (
            listaCategorias.map((categoria) => (
              <div
                key={categoria.id_categoria}
                className="col-12 col-md-6 col-lg-4 d-flex"
              >
                <CardCatTabla categoria={categoria} loading={false} />
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
