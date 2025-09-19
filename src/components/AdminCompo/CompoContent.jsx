import React from "react";
import { FaPlus } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";

const CompoContent = ({ children = null, tipo, contenido }) => {
  const placeholder = `Buscar algun ${tipo}`;

  return (
    <div className="border p-3 rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="h5 m-0 normal-text">Gestión de {tipo}</h2>
          <p className="m-0 mt-1 text-muted">
            Podras generar un crud de {tipo}
          </p>
        </div>
        <button className="btn btn-comprar d-flex align-items-center gap-1">
          <FaPlus /> Crear {tipo}
        </button>
      </div>

      <div className="d-flex align-items-center border rounded mt-4 bg-white px-2">
        <IoSearchSharp className="me-2 text-muted" />
        <input
          type="text"
          placeholder={placeholder}
          className="form-control border-0 shadow-none"
        />
      </div>

      <div className="mt-3">{children}</div>
    </div>
  );
};

export default CompoContent;
