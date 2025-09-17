import React from "react"
import CardStats from "../../components/AdminCompo/CardStat"

const AdminStats = () =>{
  return(
    <>
      <div>
        <h2 className="">Resumen:</h2>
      </div>
      <div className="row d-flex gap-4   px-3" >
          <CardStats titulo={"Clientes Registrados"} img={""} stats={90} desc={"Clientes Con Cuenta"}/>
          <CardStats titulo={"Productos"} img={""} stats={15} desc={"En el catalogo"}/>
          <CardStats titulo={"Cuentas Admin"} img={""} stats={4} desc={"Cuentas Creadas"}/>
          <CardStats titulo={"Stock Total"} img={""} stats={25} desc={"Productos En El Inventario"}/>
          <CardStats titulo={"Blog"} img={""} stats={6} desc={"Articulos Creados"}/>
      </div>
    </>
  )
}
export default AdminStats