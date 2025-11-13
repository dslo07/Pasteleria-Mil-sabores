import { useEffect, useState } from "react";
  
import { Link,Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AlertModal from "../../components/AlerModal";
import ModalPerfilUser from "../../components/UserCompo/ModalPerfilUser";
import useFetch from "../../hooks/useFetch";
import useMutation from "../../hooks/useMutation";
import PerfilUsuarioSKL from "../../components/skeletons/PerfilUsuarioSKL.jsx";

const PerfilUsuario = () => {
  const idstorage = localStorage.getItem("id");
  const navigate = useNavigate();

  // Estados
  const [usuario, setUsuario] = useState({
    nombres_cliente: "",
    appat_cliente: "",
    apmat_cliente: "",
    email_cliente: "",
    fecha_nacimiento: "",
    telefono_cliente: "",
  });
  const [idUsuario, setIdUsuario] = useState(null);
  const [compras, setCompras] = useState([]);
  const [rol, setRol] = useState(null);
  const [mostrar, setMostrar] = useState(false);
  const [modal, setModal] = useState(false);

  const {
    execute: actualizarUsuario,
    loading: cargandoUpdate,
    error: errorUpdate,
    response: respuestaUpdate,
  } = useMutation();

  // Estado y handler para el botón "Historial de Pedidos"
  const [cargandoHist, setCargandoHist] = useState(false);
  
  const handleHistorialClick = () => {
    setCargandoHist(true);
    setTimeout(() => {
      navigate("/historial-pedido");
    }, 1000);
  };

  useEffect(() => {
    const rolGuardado = localStorage.getItem("rol");
    setRol(rolGuardado ? rolGuardado.trim().toLowerCase() : null);
  }, []);

  //  desmontar token 
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
        setIdUsuario(decoded.id);
      } else {
        console.warn("No hay token guardado");
      }
    } catch (error) {
      console.error("Error al decodificar token:", error);
    }
  }, []);

  //  si no hay idUsuario no hacer fetch   
  const url = idUsuario ? `${import.meta.env.VITE_PAGINA_USER_PERFIL_USUARIO}${idUsuario}` : null;
  const urlActua = idUsuario? `${import.meta.env.VITE_PAGINA_USER_PERFIL_USUARIO_ACTUALIZAR}${idUsuario}`: null;

  const { data, loading, error } = useFetch(url);

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
    localStorage.clear(); // En el siguiente render te mandará a /login
  };

  //  Si no hay token se redirige
  if (!localStorage.getItem("token")) return <Navigate to="/login" />;
  if (!idUsuario) return <PerfilUsuarioSKL />; // evita render antes de tener ID
  if (loading) return <PerfilUsuarioSKL />;
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
        {/* Formulario principal */}
        <div className="col-md-7 d-none d-md-inline">
          <div className="card shadow-sm rounded-4 p-4">
            <h1 className="mb-3">Bienvenido, {usuario.nombres_cliente}</h1>
            <p className="text-muted mb-4">Editar información personal</p>

            <form onSubmit={handleGuardar}>
              <div className="mb-3">
                <label className="form-label">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombres_cliente"
                  value={usuario.nombres_cliente}
                  onChange={handleChange}
                />
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Apellido Paterno</label>
                  <input
                    type="text"
                    className="form-control"
                    name="appat_cliente"
                    value={usuario.appat_cliente}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Apellido Materno</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apmat_cliente"
                    value={usuario.apmat_cliente}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                  type="email"
                  className="form-control"
                  name="email_cliente"
                  value={usuario.email_cliente}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  name="fecha_nacimiento"
                  value={usuario.fecha_nacimiento}
                  onChange={handleChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-comprar w-100 mt-3"
                disabled={cargandoUpdate}
              >
                {cargandoUpdate ? "Guardando..." : "Confirmar cambios"}
              </button>
            </form>
          </div>
        </div>

        {/* Tarjeta lateral */}
        <div className="col-md-5">
          <div className="card shadow-sm rounded-4 text-center px-4 py-4">
            <div className="d-flex flex-column flex-sm-row justify-content-between alignr-items-start align-items-sm-center mb-3">
              <div className="mb-2 mb-sm-0">
                <button onClick={cerrarSesion} className="btn btn-danger">
                  Cerrar
                </button>
              </div>

              {rol === "admin" && (
                <div>
                  <button onClick={() => navigate("/admin")} className="btn btn-success">
                    Panel de admin
                  </button>
                </div>
              )}
            </div>

            <img
              src="https://avatars.githubusercontent.com/u/147568951?s=400&u=2f8703b990535553a8b915da8db89f4a11115349&v=4"
              alt={`Foto de perfil de ${usuario.nombres_cliente}`}
              className="rounded-circle border border-3 mx-auto mb-3"
              width="120"
            />

            <h4 className="mb-0">
              {usuario.nombres_cliente} {usuario.appat_cliente}
            </h4>
            <p className="text-muted mb-0">{usuario.email_cliente}</p>
            <hr />
            <p className="text-muted">Nacimiento: {usuario.fecha_nacimiento}</p>

            {/* Botón responsive */}
            <div>
              <button
                onClick={() => setMostrar(!mostrar)}
                className="btn btn-comprar w-100 mt-3 d-md-none"
              >
                Editar Perfil
              </button>
            </div>

            {/* Acordeón de historial */}
            <div className="accordion py-3" id="accordionExample">
              <div className="accordion-item">
                <h2 id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    Ver historial de compras
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body d-flex flex-column align-items-center">
                    {compras.length === 0 ? (
                      <>
                        <strong>No has realizado compras.</strong>
                        <iframe
                          src="https://lottie.host/embed/173ad0fe-4a69-4496-a7f3-e543032e27f1/iEaCF6Nuqj.lottie"
                          style={{ border: "none", width: "100px", height: "100px" }}
                        ></iframe>
                        <div className="py-2">
                          <button onClick={() => navigate("/tienda")} className="btn btn-success">
                            Realizar Mi Primer Compra
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {mostrar && (
        <ModalPerfilUser usuario={usuario} handleChange={handleChange} />
      )}
    </div>
  );
};

export default PerfilUsuario;
