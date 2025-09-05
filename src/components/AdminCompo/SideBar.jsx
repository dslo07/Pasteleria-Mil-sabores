import React from "react";
import { NavLink } from "react-router-dom";
import logotipo from "../../img/image.png";

const SideBar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100"
      style={{ width: "280px" }}
    >
      {/* Logo y nombre */}
      <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <svg className="bi me-2" width="40" height="32">
          <use xlinkHref="#bootstrap"></use>
        </svg>
        <span className="fs-4">Mil Sabores</span>
      </a>
      <hr />

      {/* Menú */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
            aria-current="page"
          >
            <svg className="bi me-2" width="16" height="16">
              <use xlinkHref="#home"></use>
            </svg>
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
            Ordenes
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
