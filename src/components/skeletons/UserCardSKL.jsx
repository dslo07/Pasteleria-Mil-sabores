import React from "react";

const UserCardSKL = () => {
  return (
    <div
      className="user-card w-100 d-flex align-items-center justify-content-between border rounded px-3 py-2 shadow-sm bg-white my-2"
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      {/* Lado izquierdo icono - nombre - correo */}
      <div className="d-flex align-items-center gap-3 flex-grow-1">
        <div
          className="d-flex align-items-center justify-content-center rounded-circle bg-light skeleton skeleton-avatar"
          style={{
            width: "45px",
            height: "45px",
            backgroundColor: "#f0f0f0", // Fondo gris claro para el avatar
          }}
        ></div>
        <div className="text-truncate">
          <div className="skeleton skeleton-text" style={{ width: "120px", height: "16px" }}></div>
          <div className="skeleton skeleton-text" style={{ width: "100px", height: "12px", marginTop: "8px" }}></div>
        </div>
      </div>

      {/* Centro, teléfono y rol */}
      <div
        className="d-flex align-items-center justify-content-center flex-wrap gap-2 text-center"
        style={{
          minWidth: "180px",
          gap: "0.5rem", // Añadido un pequeño gap entre los elementos
        }}
      >
        <div className="skeleton skeleton-text" style={{ width: "60px", height: "20px", borderRadius: "8px" }}></div>
        <div className="skeleton skeleton-text" style={{ width: "60px", height: "20px", borderRadius: "8px" }}></div>
      </div>

      {/* Derecha botones */}
      <div className="text-end">
        <div
          className="skeleton skeleton-button"
          style={{
            width: "100px",
            height: "32px",
            borderRadius: "0.5rem",
            whiteSpace: "nowrap",
            backgroundColor: "#f0f0f0", // Fondo gris claro para el botón
          }}
        ></div>
      </div>
    </div>
  );
};

export default UserCardSKL;
