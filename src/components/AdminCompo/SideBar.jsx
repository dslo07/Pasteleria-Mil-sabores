import React from "react";
import { NavLink } from "react-router-dom";
import logotipo from "../../img/image.png";
import nombrelogo from "../../img/nombre-logo.png";
import { ImStatsDots } from "react-icons/im";
import { FaCartShopping } from "react-icons/fa6";

const SideBar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dash h-100"
      style={{ width: "280px" }}
    >
      {/* Logo y nombre */}
        <img src={nombrelogo} alt="nombre de la empres" width={"200px "} />
      <hr />

      {/* Menú */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin/estadisticas "
            className={({ isActive }) =>
              "nav-link d-flex align-items-center active  " + (isActive ? "active" : "text-white")
            }
            aria-current="page"
          >
            <ImStatsDots className="ml-2"/>
            Estadisticas
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
            aria-current="page"
          >
            <FaCartShopping className="ml-2" />
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/usuarios"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#speedometer2"></use>
            </svg>
            Usuarios
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/ordenes"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#table"></use>
            </svg>
            Blog
          </NavLink>
        </li>
      </ul>

      <hr />

      {/* Link a vista de usuario */}
      <div>
        <NavLink
          to="/tienda"
          className="d-flex align-items-center text-white text-decoration-none"
        >
          <img
            src={logotipo}
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>Volver a tienda</strong>
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;