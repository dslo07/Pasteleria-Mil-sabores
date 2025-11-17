import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import useMutation from "../../hooks/useMutation";
import { use } from "react";
const CardUserTabla = ({ usuario }) => {
  const nombreCompleto = `${usuario.nombres_cliente || ""} ${usuario.appat_cliente || ""} ${usuario.apmat_cliente || ""}`.trim();
  const correo = usuario.email_cliente || "Sin correo";
  const rol = usuario.rol || "Cliente";
  const activo = usuario.activo
  const { execute, loading, error } = useMutation();


  const elimiarUser = () =>{
    let url = import.meta.env.VITE_COMPONENTE_ADMIN_CARD_PROD_TABLA_BORRAR+usuario.id_usuario
    execute(url, "DELETE")
    .then(() => alert("Usuario eliminado correctamente"))
    .catch(() => alert("Error al eliminar el usuario"));

    window.location.reload()
  }


  return (
    
    <div
      className="user-card d-flex align-items-center justify-content-between border rounded px-3 py-2 shadow-sm bg-white my-2"
      style={{
        width: "100%",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/*  lado izquierdo icono - nombre - correo */}
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle bg-light"
          style={{
            width: "45px",
            height: "45px",
          }}
        >
          <FaUsers size={22} className="text-secondary" />
        </div>
        <div className="text-truncate">
          <h5 className="mb-0 ">{nombreCompleto}</h5>
          <p className="text-muted mb-0 small">{correo}</p>
        </div>
      </div>

      {/*  Centro, teléfono y rol */}
      <div
        className="d-flex align-items-center justify-content-center flex-wrap gap-2 text-center"
        style={{ minWidth: "180px" }}
      >
        <span
          className="tag-inactivo"
          style={{ fontSize: "0.85rem" }}
        >
          {rol}
        </span>
        <span
          className="tag-rol"
          style={{ fontSize: "0.85rem" }}
        >
          {activo ? "Activo" : "Inactivo"}
        </span>
      </div>

      {/*  Derecha botones */}
      <div className="d-flex justify-content-end gap-3">
          <button
            className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
            style={{
              fontSize: "0.9rem",
              borderRadius: "0.5rem",
              whiteSpace: "nowrap",
            }}
          >
            <Link to={`editar-usuario/${usuario.id_usuario}`}>
                <CiEdit size={18} /> Editar
            </Link>
          </button>
          <button
          onClick={elimiarUser}
            className="btn btn-outline-danger  btn-sm d-flex align-items-center gap-1"
            style={{
              fontSize: "0.9rem",
              borderRadius: "0.5rem",
              whiteSpace: "nowrap",
            }}
          >
                <CiEdit size={18} /> Borrar
          </button>
      </div>
    </div>
  );
};

export default CardUserTabla;
