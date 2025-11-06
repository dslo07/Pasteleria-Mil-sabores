import React from "react";
import { NavLink } from "react-router-dom";
import logotipo from "../../img/image.png";
import nombrelogo from "../../img/nombre-logo.png";
import { IoStatsChart } from "react-icons/io5";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { RiNewsFill } from "react-icons/ri";
import { IoDuplicate } from "react-icons/io5";


const SideBar = () => {
  const menuItems = [
    { to: "/admin", label: "Dashboard", icon: <IoStatsChart /> },
    { to: "/admin/productos", label: "Control de Stock", icon: <FaShoppingCart /> },
    { to: "/admin/categorias", label: "Categorías", icon: <IoDuplicate /> },
    { to: "/admin/usuarios", label: "Usuarios", icon: <FaUserCircle /> },
    { to: "/admin/blog", label: "Blog", icon: <RiNewsFill /> },
    { to: "/admin/admin-perfil", label: "Mi Perfil", icon: <FaUserCircle />, hideOnDesktop: true },
  ];

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dash h-100"
      style={{ width: "280px" }}
    >
      {/* Logo */}
      <img src={nombrelogo} alt="nombre de la empresa" width="200px" />
      <hr />

      {/* Menú */}
      <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map(({ to, label, icon, hideOnDesktop }) => (
          <li key={to} className={`nav-item ${hideOnDesktop ? "d-lg-none" : ""}`}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                `nav-link d-flex align-items-center ${
                  isActive ? "active" : "text-white"
                }`
              }
            >
              {icon && <span className="me-2">{icon}</span>}
              {label}
            </NavLink>
          </li>
        ))}
      </ul>

      <hr />

      {/* Enlace a tienda */}
      <div>
        <NavLink
          to="/tienda"
          className="d-flex align-items-center text-white text-decoration-none"
        >
          <img
            src={logotipo}
            alt="logo tienda"
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
