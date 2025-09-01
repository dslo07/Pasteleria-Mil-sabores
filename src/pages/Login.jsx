import React from 'react';
import { Link } from 'react-router-dom';
import logo  from '../img/nombre-logo.png'
const Login = () => {
  return (
    <section  className='vh-100' style={{ backgroundColor: '#FFC0CB' }}>
      <div className="container py-1 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card" style={{ borderRadius: '1rem' }}>
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block ">
                  <img
                    src="https://www.pasteleriaelparron.cl/wp-content/uploads/2019/03/IMG_8535-scaled.jpg"
                    alt="login form"
                    className="img-fluid"
                    style={{ borderRadius: '1rem 0 0 1rem' }}
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body  text-black">

                    <form>
                      <div className="d-flex align-items-center justify-content-center">
                          <i className="fas fa-cubes fa-2x me-3" style={{ color: '#8B4513' }}></i>
                          <img src={logo} height="80px" alt="Logo" />
                        </div>

                      <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>
                        Ingresa los datos de tu cuenta
                      </h5>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example17">
                          Correo Electrónico:
                        </label>
                        <input
                          type="email"
                          id="form2Example17"
                          placeholder="tucorreo@gmail.com"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example27">
                          Contraseña:
                        </label>
                        <input
                          type="password"
                          id="form2Example27"
                          placeholder="**********"
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button className="btn-general border-0" type="button">
                          Iniciar Sesión
                        </button>
                      </div>

                      <a className="small text-muted" href="#!">Recuperar Contraseña</a>
                      <p className="mb-5 pb-lg-2" style={{ color: '#393f81' }}>
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
