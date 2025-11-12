import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/nombre-logo.png";
import { supabase } from "../../Lib/supabase";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    contrasena: "",
    nacimiento: "",
  });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    const { id, value } = e.target;             
    setForm((prev) => ({ ...prev, [id]: value }));
  };
  const API_URL = `${import.meta.env.VITE_PAGINA_USER_REGISTER}`;


  async function registrarUsuario(payload) {
    const res = await fetch(`${API_URL}/crear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),          
    });

    let data = {};
    try { data = await res.json(); } catch {}

    if (!res.ok) {
      throw new Error(data.error || data.msg || "Error al registrar");
    }
    return data;
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombres || !form.apellidoPaterno || !form.correo || !form.contrasena || !form.nacimiento) {
      setMsg("Debes completar todos los campos obligatorios.");
      return;
    }

    try {
      // Limpia el payload (solo strings/fechas, nada de DOM/eventos)
      const payload = {
        nombres: form.nombres ?? "",
        apellidoPaterno: form.apellidoPaterno ?? "",
        apellidoMaterno: form.apellidoMaterno ?? "",
        correo: form.correo ?? "",
        contrasena: form.contrasena ?? "",
        nacimiento: form.nacimiento ?? "",
      };

      // 1) Supabase (usa form.correo / form.contrasena)
      const { data, error } = await supabase.auth.signUp({
        email: form.correo,
        password: form.contrasena,
        options: {
          emailRedirectTo: `${import.meta.env.VITE_SITE_URL}/login`,
        },
      });
      if (error) throw error;

      // 2) Backend (Express) – payload limpio
      await registrarUsuario(payload);

      setMsg("Registrado con éxito. Redirigiendo a login…");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMsg("Error: " + err.message);
    }
  };
   return (
    <section className="vh-100" style={{ backgroundColor: '#FFC0CB' }}>
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
                        <i className="fas fa-cubes fa-2x me-3" style={{ color: '#8B4513' }}></i>
                        <img src={logo} height="50px" alt="Logo" />
                      </div>

                      {msg && <div className="alert alert-info py-2 my-2">{msg}</div>}

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="nombres">Nombres*</label>
                        <input
                          type="text"
                          id="nombres"
                          placeholder="Tus nombres"
                          className="form-control"
                          value={form.nombres}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-outline mb-2">
                        <div className="row">
                          <div className="col-md-6">
                            <label className="form-label" htmlFor="apellidoPaterno">Apellido Paterno*</label>
                            <input
                              type="text"
                              id="apellidoPaterno"
                              placeholder="Apellido Paterno"
                              className="form-control"
                              value={form.apellidoPaterno}
                              onChange={onChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label" htmlFor="apellidoMaterno">Apellido Materno</label>
                            <input
                              type="text"
                              id="apellidoMaterno"
                              placeholder="Apellido Materno"
                              className="form-control"
                              value={form.apellidoMaterno}
                              onChange={onChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="correo">Correo Electrónico*</label>
                        <input
                          type="email"
                          id="correo"
                          placeholder="tucorreo@gmail.com"
                          className="form-control"
                          value={form.correo}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="contrasena">Contraseña*</label>
                        <input
                          type="password"
                          id="contrasena"
                          placeholder="**********"
                          className="form-control"
                          value={form.contrasena}
                          onChange={onChange}
                        />
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="nacimiento">Fecha de nacimiento*</label>
                        <input
                          type="date"
                          id="nacimiento"
                          className="form-control"
                          value={form.nacimiento}
                          onChange={onChange}
                        />
                      </div>

                      <div className="pt-1 mb-2">
                        <button className="btn-general border-0" type="submit">
                          Registrarme
                        </button>
                      </div>

                      <p className="mb-2 pb-lg-2" style={{ color: '#393f81' }}>
                        <Link to="/login" style={{ color: '#393f81' }}>Ya tengo cuenta</Link>
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
}

export default Register;