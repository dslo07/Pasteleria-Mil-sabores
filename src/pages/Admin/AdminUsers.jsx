import React, { useState, useEffect } from "react";
import useMutation from "../../hooks/useMutation"; 
import CardUserTabla from "../../components/AdminCompo/CardUserTabla";
import CompoContent from "../../components/AdminCompo/CompoContent";
import { IoSearchSharp } from "react-icons/io5";

  const API_URL = `${import.meta.env.VITE_PAGINA_ADMIN_USER}`;

const AdminUsers = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtrados, setFiltrados] = useState([]);

  // usamos tu custom hook
  const { execute, loading, error } = useMutation();

  // función para cargar usuarios
  const fetchUsuarios = async () => {
    const result = await execute(API_URL, "GET");

    if (result && result.usuarios) {
      setUsuarios(result.usuarios);
      setFiltrados(result.usuarios);
    } else {
      console.error("Error al obtener usuarios:", error);
    }
  };

  // cargar al montar el componente
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // manejar búsqueda
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

        {loading && (
          <p className="text-center mt-4 text-muted">Cargando usuarios...</p>
        )}

        {!loading && filtrados.length > 0 ? (
          <div className="row g-4 mt-3">
            {filtrados.map((usuario) => (
              <div key={usuario.id_usuario}>
                <CardUserTabla usuario={usuario} />
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <p className="text-center mt-4 text-muted">
              No se encontraron usuarios.
            </p>
          )
        )}
      </div>
    </CompoContent>
  );
};

export default AdminUsers;
