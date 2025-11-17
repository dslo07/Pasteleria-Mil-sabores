import { useEffect, useState } from "react";
import { fetchMe } from "../hooks/fetchMe"; 

const BotonesAccion = ({ cerrarSesion, navigate }) => {
  const [rol, setRol] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const cargarRol = async () => {
      try {
        const data = await fetchMe(token);
        setRol(data.rol);
      } catch (error) {
        console.error("Error cargando rol:", error);
      }
    };
    
    cargarRol();
  }, [token]);
  // console.log("Rol del usuario en BotonesAccion:", rol);
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
      
      <button onClick={cerrarSesion} className="btn btn-danger">
        Cerrar
      </button>

      {rol === "admin" && (
        <button onClick={() => navigate("/admin")} className="btn btn-success">
          Ir a Panel Admin
        </button>
      )}
    </div>
  );
};

export default BotonesAccion;