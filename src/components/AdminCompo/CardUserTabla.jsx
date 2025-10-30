import React from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const CardUserTabla = ({ usuario }) => {
  const nombreCompleto = `${usuario.nombres_cliente || ""} ${usuario.appat_cliente || ""} ${usuario.apmat_cliente || ""}`.trim();
  const correo = usuario.email_cliente || "Sin correo";
  const rol = usuario.rol || "Cliente";
  const activo = usuario.estado !== undefined ? usuario.estado : true;
console.log(usuario);

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
      <div className="text-end">
        <Link to={`/admin/usuarios/editar-usuario/${usuario.id_usuario}`}>
          <button
            className="btn btn-outline-success btn-sm d-flex align-items-center gap-1"
            style={{
              fontSize: "0.9rem",
              borderRadius: "0.5rem",
              whiteSpace: "nowrap",
            }}
          >
            <CiEdit size={18} /> Editar
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardUserTabla;
