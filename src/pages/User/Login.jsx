import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/nombre-logo.png";
import { userContext } from "../../context/user/userContext";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogin } = useContext(userContext);

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [msg, setMsg] = useState("");

  const API_URL = "http://localhost:5174/api/usuario";

  // === Petición al backend ===
 async function loginUsuario({ correo, contrasena }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  const raw = await res.text(); // lee siempre como texto
  let data;
  try { data = JSON.parse(raw); } catch { data = {}; }

  if (!res.ok) {
    const message = data.msg || data.error || raw || `Error ${res.status}`;
    const error = new Error(message);
    error.status = res.status;
    error.body = raw;
    console.error("Login error:", { status: res.status, body: raw }); // <-- clave
    throw error;
  }

  return data;
}

  // === Manejador del formulario ===
  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const data = await loginUsuario({ correo, contrasena });
      const { token, user } = data;

      console.log("Token:", token);

      setIsLogin(true);
      setMsg("Inicio de sesión exitoso ✅");

      // Guardar datos en localStorage
      localStorage.setItem("id", String(user.id));
      localStorage.setItem("rol", String(user.rol));
      localStorage.setItem("token", String(token));

      // Redirección según rol
      if (user.rol === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // Cliente u otros
      }

    } catch (err) {
      console.error("Error al iniciar sesión:", err);

      if (err.status === 400) {
        setMsg("Correo o contraseña inválidos ❌");
      } else if (err.status === 500) {
        setMsg("Error interno del servidor. Inténtalo más tarde ⚠️");
      } else {
        setMsg(err.message || "No se pudo iniciar sesión");
      }
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#FFC0CB" }}>
      <div className="container py-1 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: "1rem" }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://www.pasteleriaelparron.cl/wp-content/uploads/2019/03/IMG_8535-scaled.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: "1rem 0 0 1rem" }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body text-black">

                    <form onSubmit={onSubmit}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={logo} height="80px" alt="Logo" />
                      </div>

                      {msg && (
                        <div className="alert alert-info py-2 my-2 text-center">
                          {msg}
                        </div>
                      )}

                      <h5 className="fw-normal mt-3 pb-3">
                        Ingresa los datos de tu cuenta
                      </h5>

                      <div className="form-outline mb-4">
                        <label htmlFor="correo">Correo Electrónico:</label>
                        <input
                          type="email"
                          id="correo"
                          className="form-control form-control-lg"
                          value={correo}
                          placeholder="tucorreo@duocuc.cl"
                          onChange={(e) => setCorreo(e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label htmlFor="contrasena">Contraseña:</label>
                        <input
                          type="password"
                          id="contrasena"
                          className="form-control form-control-lg"
                          placeholder="*******"
                          value={contrasena}
                          onChange={(e) => setContrasena(e.target.value)}
                          required
                        />
                      </div>

                      <div className="pt-1 mb-2">
                        <button className="btn-general border-0" type="submit">
                          Iniciar Sesión
                        </button>
                      </div>

                      <Link to="/" className="small text-muted">Volver</Link>
                      <p className="mb-2 pb-lg-2">
                        ¿Aún no tienes cuenta?{" "}
                        <Link to="/registro" style={{ color: "#393f81" }}>
                          Regístrate Aquí
                        </Link>
                      </p>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
