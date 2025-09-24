import { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { userContext } from '../../context/user/userContext';
import { carContext } from '../../context/carrito/carContext';
import useFetch from '../../hooks/useFetch';
import logoPasteleria from '../../img/nombre-logo.png';
import { FaUserCheck } from "react-icons/fa6";

function NavBar() {
  const { isLogin } = useContext(userContext);
  const { total } = useContext(carContext);
  const { data: categorias, loading } = useFetch("./ApiCategorias.json");

  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top">
      <div className="container">
        {/* Logo */}
        <Link to="/">
          <img src={logoPasteleria} alt="nombre de la empresa" height="50" />
        </Link>

        {/* Toggler para móvil */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
                end
              >
                Inicio
              </NavLink>
            </li>

<li className="nav-item dropdown">
  <a
    href="#"
    className="nav-link dropdown-toggle"
    role="button"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    Productos
  </a>
  <ul className="dropdown-menu">
    {loading
      ? <li className="dropdown-item">Cargando...</li>
      : categorias.map((cat, index) => (
          <li key={index}>
            <NavLink
              to={`/productos/${cat.Nombre}`}
              className={({ isActive }) =>
                "dropdown-item my-2 border-bottom" + (isActive ? " active" : "")
              }
            >
              {cat.Nombre}
            </NavLink>
          </li>
      ))
    }
  </ul>
</li>

            <li className="nav-item">
              <NavLink
                to="/blog"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Blog
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/nosotros"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Nosotros
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contacto"
                className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        <div className='d-flex gap-2 flex-row-reverse'>

            {/* Botón carrito o login */}
            {isLogin ? (
                <div className='d-flex gap-2'>
                  <NavLink to="/my-car">
                    <button className="btn btn-outline-success d-flex gap-2 text-decoration-none">
                      <i className="bi bi-basket3-fill"></i>
                      <span className="text-decoration-none">{total}</span>
                    </button>
                  </NavLink>
                  <NavLink to="/mi-perfil">
                    <button className="btn btn-outline-success d-flex gap-2 text-decoration-none">
                      <FaUserCheck/>
                    </button>
                  </NavLink>
                </div>
            ) : (  
            <NavLink to="/login">
                <button className="btn btn-outline-success">
                  <i className="bi bi-person-circle text-success"></i>
                </button>
              </NavLink>
            )}
        </div>

        </div>
      </div>
    </nav>
  );
}

export default NavBar;
