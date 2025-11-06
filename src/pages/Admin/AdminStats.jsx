import React from "react";
import useFetch from "../../hooks/useFetch";
import CardStats from "../../components/AdminCompo/CardStat";
import { FaUsers } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { FaNewspaper } from "react-icons/fa6";

const AdminStats = () => {
  const { data, loading, error } = useFetch("http://localhost:5174/api/estadisticas");

  if (loading) return <p>Cargando estadísticas...</p>;
  if (error) return <p>Error al cargar estadísticas</p>;

  return (
    <>
      <div>
        <h2>Resumen:</h2>
      </div>
      <div className="row d-flex gap-2 px-3">
        <CardStats titulo="Registrados" img={<FaUsers />} stats={data.clientes} desc="Clientes Con Cuenta" />
        <CardStats titulo="Productos" img={<FaCartShopping />} stats={data.productos} desc="En el catálogo" />
        <CardStats titulo="Cuentas Admin" img={<RiAdminFill />} stats={data.administradores} desc="Cuentas Creadas" />
        <CardStats titulo="Blog" img={<FaNewspaper />} stats={data.blogs} desc="Artículos Creados" />
      </div>
    </>
  );
};

export default AdminStats;
