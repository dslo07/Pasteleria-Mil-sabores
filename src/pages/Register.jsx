import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/nombre-logo.png';

function Register() {
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
                    <form>
                      <div className="d-flex align-items-center justify-content-center">
                          <i className="fas fa-cubes fa-2x me-3" style={{ color: '#8B4513' }}></i>
                          <img src={logo} height="50px" alt="Logo" />
                        </div>
                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="nombres">
                          Nombres:
                        </label>
                        <input
                          type="text"
                          id="nombres"
                          placeholder="Tus nombres"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-2">
                        <div className="row">
                          <div className="col-md-6">
                            <label className="form-label" htmlFor="apellidoPaterno">
                              Apellido Paterno:
                            </label>
                            <input
                              type="text"
                              id="apellidoPaterno"
                              placeholder="Apellido Paterno"
                              className="form-control form-control-lg"
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label" htmlFor="apellidoMaterno">
                              Apellido Materno:
                            </label>
                            <input
                              type="text"
                              id="apellidoMaterno"
                              placeholder="Apellido Materno"
                              className="form-control form-control-lg"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="correo">
                          Correo Electrónico:
                        </label>
                        <input
                          type="email"
                          id="correo"
                          placeholder="tucorreo@gmail.com"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-2">
                        <label className="form-label" htmlFor="contrasena">
                          Contraseña:
                        </label>
                        <input
                          type="password"
                          id="contrasena"
                          placeholder="**********"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn-general border-0" type="button">
                          Registrarme
                        </button>
                      </div>

                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
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
