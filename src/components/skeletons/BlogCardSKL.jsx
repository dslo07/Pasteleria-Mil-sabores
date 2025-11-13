import React from "react";

const BlogCardSKL = () => {
  return (
    <div
      className="mb-4 shadow-sm p-3 rounded"
      style={{
        border: "1px solid #e0e0e0",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* Skeleton para la imagen */}
      <div
        className="skeleton skeleton-image"
        style={{
          width: "100%",
          height: "220px",
          borderRadius: "10px",
        }}
      ></div>

      <div>
        {/* Skeleton para el título */}
        <div className="skeleton skeleton-text" style={{ width: "50%", height: "24px", marginBottom: "10px" }}></div>
        
        {/* Skeleton para la descripción */}
        <div className="skeleton skeleton-text" style={{ width: "80%", height: "16px", marginBottom: "15px" }}></div>
        
        <div className="d-flex gap-2 mt-3">
          {/* Skeleton para el botón "Editar" */}
          <div className="skeleton skeleton-button" style={{ width: "80px", height: "32px", borderRadius: "20px" }}></div>

          {/* Skeleton para el botón "Eliminar" */}
          <div className="skeleton skeleton-button" style={{ width: "80px", height: "32px", borderRadius: "20px" }}></div>
        </div>
      </div>
    </div>
  );
};

export default BlogCardSKL;
