import React from 'react'

const Slider = () => {
  return (
    <div className="my-5">
        <div className="row g-0">
          <div
            className="col-md-4 d-flex flex-column justify-content-center align-items-center text-center p-4"
            style={{ backgroundColor: "#ffc0cb79" }}
          >
            <img src="src/img/logo-sin-fondo.png" alt="Mil Sabores Logo"  style={{width:"400px"}}/>
            <h2 className="my-3 fs-3 fw-bold">Mil Sabores</h2>
            <p className="mb-4">
              Endulza tu día hoy <br /> ¡Haz tu pedido ahora y disfruta de la frescura de nuestros postres!
            </p>
            <a
              href="#"
              className="btn btn-lg px-4"
              style={{ backgroundColor: "#8B4513", color: "white", borderRadius: "5px" }}
            >
              COMPRA ONLINE
            </a>
          </div>

          <div className="col-md-8">
            <div className="row g-0" style={{ height: "100%" }}>
              <div className="col-6">
                <img
                  src="https://www.pasteleriaelparron.cl/wp-content/uploads/2019/03/IMG_8535-scaled.jpg"
                  alt="Torta 1"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="col-6">
                <img
                  src="https://www.pasteleriaelparron.cl/wp-content/uploads/2019/03/IMG_8597-scaled.jpg"
                  alt="Torta 2"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Slider