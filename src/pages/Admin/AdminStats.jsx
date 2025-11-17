import React from "react";
import useFetch from "../../hooks/useFetch";
import CardStats from "../../components/AdminCompo/CardStat";
import { FaUsers, FaCartShopping, FaNewspaper } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import CardStatsSKL from "../../components/skeletons/CardStatsSKL .jsx";
const AdminStats = () => {
  const url = `${import.meta.env.VITE_PAGINA_ADMIN_STATS}`;

  const { data, loading, error } = useFetch(url);  // Desestructuración para obtener 'data', 'loading' y 'error'

  // Componente Skeleton para cargar mientras se obtienen los datos
  const renderSkeleton = () => (
    <>
      <CardStatsSKL />
      <CardStatsSKL />
      <CardStatsSKL />
      <CardStatsSKL />
    </>
  );

  // Manejo de errores
  const renderError = () => (
    <div role="alert" className="alert alert-danger">
      <p>Error al cargar las estadísticas. Por favor, intenta más tarde.</p>
    </div>
  );

  // Componente principal que renderiza las estadísticas o el skeleton mientras carga
  if (loading) {
    return (
      <div>
        <h2>Resumen:</h2>
        <div className="row d-flex gap-2 px-3">
          {renderSkeleton()}
        </div>
      </div>
    );
  }

  if (error) {
    return renderError();
  }

  return (
    <>
      <div>
        <h2>Resumen:</h2>
      </div>
      <div className="row d-flex gap-2 px-3">
        <CardStats 
          titulo="Registrados" 
          img={<FaUsers />} 
          stats={data.clientes} 
          desc="Clientes Con Cuenta" 
        />
        <CardStats 
          titulo="Productos" 
          img={<FaCartShopping />} 
          stats={data.productos} 
          desc="En el catálogo" 
        />
        <CardStats 
          titulo="Cuentas Admin" 
          img={<RiAdminFill />} 
          stats={data.administradores} 
          desc="Cuentas Creadas" 
        />
        <CardStats 
          titulo="Blog" 
          img={<FaNewspaper />} 
          stats={data.blogs} 
          desc="Artículos Creados" 
        />
      </div>
    </>
  );
};

export default AdminStats;
