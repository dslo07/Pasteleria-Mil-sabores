import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from '../../img/nombre-logo.png';
import { loginUsuario } from '../../services/UsuarioServices';
import { userContext } from '../../context/user/userContext';

const Login = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [msg, setMsg] = useState("");
  const { setIsLogin } = useContext(userContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await loginUsuario({ correo, contrasena });
      console.log("Token:", user.token);

      setMsg("Login satisfactorio");
      setIsLogin(true);

      // Guardar datos en localStorage
      localStorage.setItem("rol", user.rol);
      localStorage.setItem("id", user.user.id);
      localStorage.setItem("token", user.token);

      
      // Redirección según el rol
      if (user.rol.rol_id === 1) {
        navigate("/"); // Cliente
      } else if (user.rol.rol_id === 2) {
        navigate("/admin"); // Admin
      } else {
        navigate("/"); // Fallback
      }

    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setMsg("Error: " + (err.message || "No se pudo iniciar sesión"));
    }
  };

  return (
    <section className='vh-100' style={{ backgroundColor: '#FFC0CB' }}>
      <div className="container py-1 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://www.pasteleriaelparron.cl/wp-content/uploads/2019/03/IMG_8535-scaled.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body text-black">

                    <form onSubmit={onSubmit}>
                      <div className="d-flex align-items-center justify-content-center">
                        <img src={logo} height="80px" alt="Logo" />
                      </div>

                      {msg && <div className="alert alert-info py-2 my-2">{msg}</div>}

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
                          placeholder='tucorreo@duocuc.cl'
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
                          placeholder='*******'
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
                        ¿Aún no tienes cuenta?{' '}
                        <Link to="/registro" style={{ color: '#393f81' }}>Regístrate Aquí</Link>
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