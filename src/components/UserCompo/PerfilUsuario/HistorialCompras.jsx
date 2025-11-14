
// ============================================
// 📁 PerfilUsuario/components/HistorialCompras.jsx
// ============================================
const HistorialCompras = ({ compras, navigate }) => {
  return (
    <div className="accordion py-3" id="accordionExample">
      <div className="accordion-item">
        <h2 id="headingOne">
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Ver historial de compras
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionExample"
        >
          <div className="accordion-body d-flex flex-column align-items-center">
            {compras.length === 0 ? (
              <>
                <strong>No has realizado compras.</strong>
                <iframe
                  src="https://lottie.host/embed/173ad0fe-4a69-4496-a7f3-e543032e27f1/iEaCF6Nuqj.lottie"
                  style={{ border: "none", width: "100px", height: "100px" }}
                  title="Sin compras"
                />
                <div className="py-2">
                  <button onClick={() => navigate("/tienda")} className="btn btn-success">
                    Realizar Mi Primer Compra
                  </button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistorialCompras;