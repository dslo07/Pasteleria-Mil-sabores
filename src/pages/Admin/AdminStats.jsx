import React from "react"
import CardStats from "../../components/AdminCompo/CardStat"
import { FaUsers } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { FaBox } from "react-icons/fa";
import { FaNewspaper } from "react-icons/fa6";

const AdminStats = () =>{
  return(
    <>
      <div>
        <h2 className="">Resumen:</h2>
      </div>
      <div className="row d-flex gap-2 px-3" >
          <CardStats titulo={"Registrados"} img={<FaUsers />} stats={90} desc={"Clientes Con Cuenta"}/>
          <CardStats titulo={"Productos"} img={<FaCartShopping />} stats={15} desc={"En el catalogo"}/>
          <CardStats titulo={"Cuentas Admin"} img={<RiAdminFill />} stats={4} desc={"Cuentas Creadas"}/>
          <CardStats titulo={"Stock Total"} img={<FaBox />} stats={25} desc={"Productos En El Inventario"}/>
          <CardStats titulo={"Blog"} img={<FaNewspaper/>} stats={6} desc={"Articulos Creados"}/>
      </div>
    </>
  )
}
export default AdminStats