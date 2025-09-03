import React from 'react'
import logoPasteleria from '../../img/logo-sin-fondo.png'
const Header = () => {
  return (
    <header className="container">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5 text-center text-lg-start">
        
        <div className="col-12 col-sm-8 col-lg-6 d-flex justify-content-center align-items-center">
          <img src={logoPasteleria} className="img-fluid mx-auto d-block" alt="Logo Pastelería" style={{maxWidth: "400px", height: "auto"}}  />
        </div>

        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Buscamos ofrecer una experiencia de compra moderna.
          </h1>
          <p className="lead">
            Te ofrecemos una experiencia dulce y memorable,
            proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="button" className="btn btn-general inline-block  cursor-pointer">Contactar</button>
          </div>
        </div>
        
      </div>
    </header>
  )
}

export default Header