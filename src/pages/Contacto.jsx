import React from 'react'
import NavBar from '../components/UserCompo/NavBar'
import Footer from '../components/UserCompo/Footer'
const Contacto = () => {
  return (
    <>
      <NavBar></NavBar>
      
    <div className="container py-5 mt-5">
      <div className="row g-4">
        {/* Sección de Contacto */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-3 p-4">
            <h1 className="fw-bold text-dark fs-2 mb-2">
              Contactanos.
            </h1>
            <p className="text-muted mb-2">
              ¿Tienes dudas o necesitas más información? Escríbenos y responderemos rapido,te daremos una respuesta simple y confiable.
            </p>

            <div className="mb-3 ">
                <a
                  href="tel:+56999999999"
                  className="fw-semibold text-decoration-none" style={{color:"#8B4513"}}
                >
                  📞 +56 9 1234 1234
                </a>
                <br/>
                <a
                  href="mailto:corporativo@guchsolutions.cl"
                  className="fw-semibold text-decoration-none mb-2" style={{color:"#8B4513"}}
                >
                   ✉️ contacto@milsabores.cl
                </a>
              <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.0138036448247!2d-70.67000449999999!3d-33.448946899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c45558896371%3A0xe38282e406413635!2sDuoc%20UC%3A%20Sede%20Alameda!5e0!3m2!1ses!2scl!4v1757016644415!5m2!1ses!2scl" className='w-100' height="250" style={{marginRight: "border:0;"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>

              <button className='btn btn-comprar'> Hablanos por WhatsApp</button>
          </div>
        </div>

        {/* Sección de Formulario */}
        <div className="col-lg-6">
          <div className="card shadow-sm border-0 rounded-3 p-4">
            <h2></h2>
            <form>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="tucorreo@gmail.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="asunto" className="form-label">
                  Asunto*
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="asunto"
                  placeholder="Ej: Cotizacion Tortas"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripcion*
                </label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  rows="3"
                  placeholder="Ej: Cuentanos sobre ti..."
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="btn btn-comprar w-100 fw-semibold">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
   <Footer/>
    </>
  )
}

export default Contacto