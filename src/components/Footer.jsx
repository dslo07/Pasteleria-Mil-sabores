import React from 'react'
import useFetch from '../hooks/useFetch'
import metodosImg from '../img/metodos-de-pago.webp'

const Footer = () => {
  const { data: categorias, loading } = useFetch("./ApiCategorias.json")

  return (
    <footer className="container mt-5">
      <div className="row">
        {/* Navegación */}
        <div className="col-12 col-md-6 col-lg-2 mb-4">
          <h5>Navegación</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Inicio</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Productos</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Blog</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Nosotros</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Contacto</a></li>
          </ul>
        </div>

        {/* Categorías */}
        <div className="col-12 col-md-6 col-lg-2 mb-4">
          <h5>Categorías</h5>
          <ul className="nav flex-column">
            {
              loading
                ? <li className="dropdown-item">Cargando...</li>
                : categorias.map(cat => (
                    <li key={cat.Nombre}>
                      <a className="dropdown-item my-2 border-bottom" href="#">{cat.Nombre}</a>
                    </li>
                  ))
            }
          </ul>
        </div>

        {/* Métodos de pago */}
        <div className="col-12 col-md-6 col-lg-3 mb-4">
          <h5>Métodos de pago</h5>
          <img src={metodosImg} alt="imagen de metodos de pago" className="img-fluid w-50" />
        </div>

        {/* Newsletter */}
        <div className="col-12 col-md-6 col-lg-5 mb-4">
          <form>
            <h5>Obtén las últimas novedades de Mil Sabores</h5>
            <div className="d-flex flex-column flex-sm-row w-100 gap-2 mt-3">
              <input
                id="newsletter1"
                type="email"
                className="form-control"
                placeholder="Correo electrónico"
                aria-label="Correo electrónico"
              />
              <button
                className="btn btn-primary"
                type="submit"
                style={{ backgroundColor: '#8B4513', border: '0' }}
              >
                Suscribirme
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer inferior */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-4 my-4 border-top">
        <p className="mb-2 mb-md-0 text-center text-md-start">
          © 2025 Pastelería Mil Sabores, desarrollado por Santiago Lopez y Harold Peralta.
        </p>
        <ul className="list-unstyled d-flex justify-content-center mb-0">
          <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
          <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
          <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
