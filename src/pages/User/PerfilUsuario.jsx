
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import AlertModal from "../../components/AlerModal";
import ModalPerfilUser from "../../components/UserCompo/ModalPerfilUser";
import DireccionUser from "../../components/UserCompo/PerfilUsuario/DireccionUser.jsx";
import PerfilUsuarioSKL from "../../components/skeletons/PerfilUsuarioSKL.jsx";

import useFetch from "../../hooks/useFetch";
import useMutation from "../../hooks/useMutation";

import FormularioEdicion from "../../components//UserCompo/PerfilUsuario/FormularioEdicion";
import TarjetaPerfil from "../../components//UserCompo/PerfilUsuario/TarjetaPerfil";

const INITIAL_USER_STATE = {
  nombres_cliente: "",
  appat_cliente: "",
  apmat_cliente: "",
  email_cliente: "",
  fecha_nacimiento: "",
  telefono_cliente: "",
};

const PerfilUsuario = () => {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(INITIAL_USER_STATE);
  const [idUsuario, setIdUsuario] = useState(null);
  const [rol, setRol] = useState(null);
  const [compras, setCompras] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [modal, setModal] = useState(false);
  const [mostrarDireccion, setMostrarDireccion] = useState(false);

  const {
    execute: actualizarUsuario,
    loading: cargandoUpdate,
    error: errorUpdate,
  } = useMutation();

  const url = idUsuario 
    ? `${import.meta.env.VITE_PAGINA_USER_PERFIL_USUARIO}${idUsuario}` 
    : null;
  
  const urlActua = idUsuario
    ? `${import.meta.env.VITE_PAGINA_USER_PERFIL_USUARIO_ACTUALIZAR}${idUsuario}`
    : null;

  const { data, loading, error } = useFetch(url);

  // Decodificar token
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
        setIdUsuario(decoded.id);
      }
    } catch (error) {
      console.error("Error al decodificar token:", error);
    }
  }, []);

  // Obtener rol
  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    setRol(rolGuardado ? rolGuardado.trim().toLowerCase() : null);
  }, []);

  // Actualizar usuario con datos del fetch
  useEffect(() => {
    if (data) {
      const u = data.usuario || data;
      setUsuario({
        nombres_cliente: u.nombres_cliente || "",
        appat_cliente: u.appat_cliente || "",
        apmat_cliente: u.apmat_cliente || "",
        email_cliente: u.email_cliente || "",
        fecha_nacimiento: u.fecha_nacimiento || "",
        telefono_cliente: u.telefono_cliente || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!urlActua) return;

    const result = await actualizarUsuario(urlActua, "PUT", usuario);

    if (result) {
      alert("Perfil actualizado correctamente");
    } else if (errorUpdate) {
      alert(`No se pudo actualizar el perfil: ${errorUpdate?.message || errorUpdate}`);
    }
  };

  const cerrarSesion = () => {
    setModal(true);
    localStorage.clear();
  };

  const toggleDireccion = () => {
    setMostrarDireccion((prev) => !prev);
  };

  // Renders condicionales
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  if (!idUsuario || loading) return <PerfilUsuarioSKL />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mt-5 p-4">
      {modal && (
        <AlertModal
          titulo="Cerrar Sesión"
          desc="Su sesión ha terminado con éxito"
          setModal={setModal}
        />
      )}

      <div className="row g-4">
        <div className="col-md-7 d-none d-md-block">
          <div className="card shadow-sm rounded-4 p-4">
            {/* Header con título y botón de navegación */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h1 className="mb-0">
                  {mostrarDireccion ? "Dirección de Envío" : `Bienvenido, ${usuario.nombres_cliente}`}
                </h1>
                <p className="text-muted mb-0">
                  {mostrarDireccion ? "Gestiona tus direcciones" : "Editar información personal"}
                </p>
              </div>
              <button 
                className="btn btn-comprar"
                onClick={toggleDireccion}
                type="button"
                title={mostrarDireccion ? "Volver al perfil" : "Ir a dirección"}
              >
                {mostrarDireccion ? <FaArrowAltCircleLeft /> : <FaArrowAltCircleRight />}
              </button>
            </div>

            {/* Renderizado condicional del contenido */}
            {!mostrarDireccion ? (
              <FormularioEdicion
                usuario={usuario}
                handleChange={handleChange}
                handleGuardar={handleGuardar}
                cargandoUpdate={cargandoUpdate}
              />
            ) : (
              <DireccionUser onSubmit={handleGuardar} />
            )}
          </div>
        </div>

        <TarjetaPerfil
          usuario={usuario}
          rol={rol}
          compras={compras}
          cerrarSesion={cerrarSesion}
          setMostrar={setMostrar}
          navigate={navigate}
        />
      </div>

      {mostrar && <ModalPerfilUser usuario={usuario} handleChange={handleChange} />}
    </div>
  );
};

export default PerfilUsuario;
