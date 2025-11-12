import React from "react";

const AlertModal = ({ setModal, titulo, desc }) => {
  // Función para cerrar el modal
  const handleClose = () => {
    setModal(false);
  };

  return (
    <div 
      className="modal-overlay" 
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div 
        className="modal-content" 
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          textAlign: "center",
        }}
      >
        <h5>{titulo}</h5>
        <p>{desc}</p>
        <button 
          onClick={handleClose} 
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#8B4513",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
