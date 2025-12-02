
// ============================================
// 📁 PerfilUsuario/components/BotonesAccion.jsx
// ============================================
const BotonesAccion = ({ cerrarSesion, rol, navigate }) => {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
      <button onClick={cerrarSesion} className="btn btn-danger">
        Cerrar
      </button>
      {rol == "admin" && (
        <button onClick={() => navigate("/admin")} className="btn btn-success">
          Dashboard
        </button>
      )}
    </div>
  );
};

export default BotonesAccion;