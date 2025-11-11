import React from "react";
import SideBar from "../../components/AdminCompo/SideBar";
import { Outlet, NavLink,Navigate } from "react-router-dom";
import { FaBars } from "react-icons/fa6";

const DashBoard = () => {
  const rol = localStorage.getItem("rol");
  if (rol !== "admin") {
      return <Navigate to="/notfound" />; // redirige si no es admin
  } 
    return (
    <main className="d-flex vh-100 position-relative bg-light">
      {/* Sidebar fijo en desktop */}
      <div className="d-none d-md-block">
        <SideBar />
      </div>

      {/* Botón toggle en mobile */}
      <button
        className="btn btn-light shadow d-md-none position-fixed top-0 end-0 m-3 rounded-circle p-2"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMobile"
        aria-controls="sidebarMobile"
        style={{ zIndex: 1100 }}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar  en mobile */}
      <div
        className="offcanvas offcanvas-start bg-dash text-white"
        tabIndex="-1"
        id="sidebarMobile"
        aria-labelledby="sidebarMobileLabel"
        style={{ width: "260px" }}
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title fw-bold" id="sidebarMobileLabel">
            Panel de Control
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <SideBar />
        </div>
      </div>

      {/* Contenido principal */}
      <section className="flex-grow-1 overflow-auto w-100">
        {/* Header del dashboard */}
        <header className="d-flex justify-content-between align-items-center p-3 bg-white border-bottom shadow-sm sticky-top">
          <div>
            <h1 className=" text-dark mb-0">
              Panel administrador
            </h1>
            <p className="text-muted small mb-0">
              Gestiona usuarios, productos y blog
            </p>
          </div>
          <NavLink to="/admin/admin-perfil" className="d-flex align-items-center text-dark text-decoration-none gap-2 d-none d-md-inline">
            <img
              src="https://avatars.githubusercontent.com/u/147568951?s=400&u=2f8703b990535553a8b915da8db89f4a11115349&v=4"
              alt="Perfil"
              width="45"
              className="rounded-circle border shadow-sm"
            />
            <span >Mi Perfil</span>
          </NavLink>
        </header>

        {/* Contenido */}
        <div className="p-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashBoard;
