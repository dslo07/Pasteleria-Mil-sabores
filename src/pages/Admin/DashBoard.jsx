import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/AdminCompo/SideBar";
const DashBoard = () =>{
  const userName = "Cristiano Ronaldo"
  return(
    <main className="d-flex vh-100">
      <SideBar />

      {/* Contenido principal */}
      <section className="flex-grow-1 overflow-auto ">
        <div className="p-3 text-white border  ">
          <h1 className="fs-2 text-brown">Bienvenido {userName}</h1>
          <p className="m-0 text-brown">Gestiona usuarios, productos y blog</p>
        </div>
        <div className="p-3 ">
          <Outlet />
        </div>
      </section>
    </main>

  )
}
export default DashBoard