import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../components/AdminCompo/SideBar";
const DashBoard = () =>{
  return(
    <main className="d-flex vh-100" >
      <SideBar/>
      <section>
        <Outlet/>
      </section>
    </main>
  )
}
export default DashBoard