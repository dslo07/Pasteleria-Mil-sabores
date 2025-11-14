import BotonesAccion from "../../BotonesAccion";
import InfoUsuario from "./InfoUsuario";
import HistorialCompras from "./HistorialCompras";

const TarjetaPerfil = ({ usuario, rol, compras, cerrarSesion, setMostrar, navigate }) => {

  
  return (
    <div className="col-md-5">
      <div className="card shadow-sm rounded-4 text-center px-4 py-4">
        <BotonesAccion 
          cerrarSesion={cerrarSesion} 
          rol={rol} 
          navigate={navigate} 
        />

        <InfoUsuario usuario={usuario} />

        <button
          onClick={() => setMostrar((prev) => !prev)}
          className="btn btn-comprar w-100 mt-3 d-md-none"
        >
          Editar Perfil
        </button>

        <HistorialCompras compras={compras} navigate={navigate} />
      </div>
    </div>
  );
};

export default TarjetaPerfil;
