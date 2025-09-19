import React from "react";
import { FaUsers } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const CardUserTabla = ({usuario}) => {
  const nombreCompleto = `${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`   
  return (
    <div className="d-flex flex-column mt-3 flex-md-row justify-content-between rounded border p-3 gap-3">
      {/* Parte izquierda: ícono + datos */}
      <div className="d-flex gap-3 align-items-center">
        <div className="d-flex align-items-center justify-content-center">
          <FaUsers size={"30px"} />
        </div>
        <div>
          <h1 className="fs-5 mb-0 ">{nombreCompleto}</h1>
          <p className="text-muted mb-0">{usuario.correo}</p>
        </div>
      </div>

      {/* Parte derecha: rol, estado y config */}
      <div className="d-flex align-items-center gap-2 justify-content-around">
        <span className="tag-rol">{usuario.rol}</span>
        <span className={usuario.estado ? "tag-estado" : "tag-inactivo" }>{usuario.estado ? "Activo" : "Inactivo" }</span>
        <button className="btn btn-comprar">
          <CiEdit />
        </button>
      </div>
    </div>
  );
};

export default CardUserTabla;
