import React from "react";
import { NavLink } from "react-router-dom";
import logotipo from "../../img/image.png";
import nombrelogo from "../../img/nombre-logo.png";
import { IoStatsChart } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { RiNewsFill } from "react-icons/ri";

const SideBar = () => {
  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dash h-100"
      style={{ width: "280px" }}
    >
      {/* Logo y nombre */}
      <img src={nombrelogo} alt="nombre de la empresa" width="200px" />
      <hr />

      {/* Menú */}
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
            aria-current="page"
          >
            <IoStatsChart className="me-2" />
            Estadísticas
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/productos"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
          >
            <FaCartShopping className="me-2" />
            Control de Stock
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/usuarios"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
          >
            <FaUserCircle className="me-2" />
            Usuarios
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/admin/blog"
            className={({ isActive }) =>
              "nav-link d-flex align-items-center " + (isActive ? "active" : "text-white")
            }
          >
            <RiNewsFill className="me-2" />
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
