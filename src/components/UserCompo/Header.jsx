import React from 'react'
import logoPasteleria from '../../img/logo-sin-fondo.png'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className='bg-header d-flex align-items-center py-5 mt-5'>
      <div className="container ">
        <div className="row  align-items-center text-center text-white text-lg-start">

          <div className="col-lg-6">
            <h1 className=" lh-1 ">
              Buscamos ofrecer una experiencia de compra moderna.
            </h1>
            <p className="lead">
              Te ofrecemos una experiencia dulce y memorable,
              proporcionando tortas y productos de repostería de alta calidad para todas las ocasiones.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <Link to="/contacto" className=' text-decoration-none'>
                <button type="button" className="btn btn-general inline-block  cursor-pointer">Contactar</button>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </header>
  )
}

export default Header