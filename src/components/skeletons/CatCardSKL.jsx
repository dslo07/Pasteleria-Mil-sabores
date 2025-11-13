import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

const CatCardSKL = () => {
  return (
    <div
      className="cat-card border rounded shadow-sm bg-white my-2 p-3"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* Lado izquierdo: ícono + nombre */}
      <div
        className="d-flex align-items-center flex-grow-1"
        style={{ minWidth: "200px" }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-circle bg-light flex-shrink-0"
          style={{ width: "45px", height: "45px" }}
        >
          {/* Icono de skeleton */}
          <Skeleton circle height={45} width={45} />
        </div>
        <div
          className="ms-3 text-truncate"
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          {/* Nombre de la categoría como skeleton */}
          <Skeleton width="150px" height={20} />
          <Skeleton width="100px" height={14} />
        </div>
      </div>

      {/* Lado derecho: botones */}
      <div
        className="d-flex align-items-center justify-content-end gap-2 flex-wrap"
        style={{ minWidth: "160px" }}
      >
        {/* Botón de Editar */}
        <Skeleton width="120px" height={35} borderRadius={10} />

        {/* Botón de Eliminar */}
        <Skeleton width="120px" height={35} borderRadius={10} />
      </div>
    </div>
  );
};

export default CatCardSKL;
