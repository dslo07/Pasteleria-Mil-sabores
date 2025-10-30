import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import CardUserTabla from "../../components/AdminCompo/CardUserTabla";
import CompoContent from "../../components/AdminCompo/CompoContent";
import { IoSearchSharp } from "react-icons/io5";

const AdminUsers = () => {
  const { data } = useFetch("http://localhost:5174/api/usuario"); 
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtrados, setFiltrados] = useState([]);

  //  Actualizar lista cuando llega la data
  useEffect(() => {
    if (data && data.usuarios) {
      setUsuarios(data.usuarios);
      setFiltrados(data.usuarios);
    }
  }, [data]);

  //  Maneja la búsqueda
  const handleBuscar = (e) => {
    const texto = e.target.value.toLowerCase();
    setBusqueda(texto);

    const listaFiltrada = usuarios.filter(
      (u) =>
        u.nombres_cliente?.toLowerCase().includes(texto) ||
        u.appat_cliente?.toLowerCase().includes(texto) ||
        u.apmat_cliente?.toLowerCase().includes(texto) ||
        u.email_cliente?.toLowerCase().includes(texto)
    );
    setFiltrados(listaFiltrada);
  };

  return (
    <CompoContent tipo="Usuario">
      <div className="container">
        <div className="d-flex align-items-center border rounded mt-4 bg-white px-2">
          <IoSearchSharp className="me-2 text-muted" />
          <input
            type="text"
            placeholder="Buscar usuario..."
            className="form-control border-0 shadow-none"
            value={busqueda}
            onChange={handleBuscar}
          />
        </div>

        <div className="row g-4 mt-3">
          {filtrados.length > 0 ? (
            filtrados.map((usuario) => (
              <div
                key={usuario.id_usuario}
              >
                <CardUserTabla usuario={usuario} />
              </div>
            ))
          ) : (
            <p className="text-center mt-4 text-muted">
              No se encontraron usuarios.
            </p>
          )}
        </div>
      </div>
    </CompoContent>
  );
};

export default AdminUsers;
