import React from "react";
import { FaPlus } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const CompoContent = ({ children = null, tipo }) => {
  const placeholder = `Buscar algun ${tipo}`;
  const navigate = useNavigate()
  
  const redireccion = ()=>{
    switch (tipo) {
      case "Producto":
          navigate("crear-producto"); 
        break;
      case "Blog":
          navigate("crear-blog"); 
        break;
      case "Usuario":
          navigate("crear-usuario"); 
        break;
      
    }

  }
  return (  
    <div className="border p-3 rounded">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="h5 m-0 normal-text">Gestión de {tipo}</h2>
          <p className="m-0 mt-1 text-muted">
            Podras generar un crud de {tipo}
          </p>
        </div>
        <button onClick={()=>redireccion()} className="btn btn-comprar d-flex align-items-center gap-1">
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
