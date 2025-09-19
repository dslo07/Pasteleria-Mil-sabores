import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/AdminCompo/SideBar";
import { FaBars } from "react-icons/fa6";

const DashBoard = () => {
  const userName = "Santiago López";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="d-flex vh-100 position-relative">
      {/* Sidebar fijo en desktop */}
      <div className="d-none d-md-block">
        <SideBar />
      </div>

      {/* Botón toggle para mobile (solo visible cuando sidebar está cerrado) */}
      {!sidebarOpen && (
        <button
          className="btn btn-dark d-md-none position-fixed m-2"
          style={{ zIndex: 1100 }}
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>
      )}

      {/* Fondo semitransparente cuando el sidebar está abierto */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar off-canvas lateral */}
      <div
        className="position-fixed top-0 start-0 vh-100 bg-dash text-white p-3 d-md-none"
        style={{
          width: "280px",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease-in-out",
          zIndex: 1100,
        }}
      >
        <SideBar />
        <button
          className="btn btn-light mt-3 d-md-none"
          onClick={() => setSidebarOpen(false)}
        >
          Cerrar
        </button>
      </div>

      {/* Contenido principal */}
      <section className="flex-grow-1 overflow-auto w-100">
        <div className="p-3 text-white border-start">
          <h1 className="fs-2 text-brown">Bienvenido {userName}</h1>
          <p className="m-0 text-brown">Gestiona usuarios, productos y blog</p>
        </div>
        <div className="p-3 border">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default DashBoard;
