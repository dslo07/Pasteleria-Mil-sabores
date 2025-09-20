import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/AdminCompo/SideBar";
import { FaBars } from "react-icons/fa6";

const DashBoard = () => {
  const userName = "Santiago López";

  return (
    <main className="d-flex vh-100 position-relative">
      {/* Sidebar fijo en desktop */}
      <div className="d-none d-md-block">
        <SideBar />
      </div>

      {/* Botón toggle fijo arriba a la derecha de la pantalla */}
      <button
        className="btn btn-comprar  d-md-none position-fixed top-0 end-0 m-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarMobile"
        aria-controls="sidebarMobile"
        style={{ zIndex: 1100 }}
      >
        <FaBars />
      </button>

      {/* Sidebar Offcanvas en mobile */}
      <div
        className="offcanvas offcanvas-start bg-dash text-white"
        tabIndex="-1"
        id="sidebarMobile"
        aria-labelledby="sidebarMobileLabel"
        style={{ width: "280px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMobileLabel">
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
        <div className="p-3 border-start bg-light">
          <h1 className="fs-2 text-brown">Bienvenido {userName}</h1>
          <p className="m-0 text-brown">Gestiona usuarios, productos y blog</p>
        </div>
        <div className="p-3 border bg-white">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashBoard;
