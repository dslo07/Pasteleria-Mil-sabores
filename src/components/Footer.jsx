import React from 'react'
import useFetch from '../hooks/useFetch'

const Footer = () => {
  const { data: categorias, loading } = useFetch("./ApiCategorias.json")

  return (
    <footer className="container">
      <div className="row">
        <div className="col-2" style={{ maxHeight: '100px' }}>
          <h5>Navegacion</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Inicio</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Productos</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Blog</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Nosotros</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Contacto</a></li>
          </ul>
        </div>

        <div className="col-2">
          <h5>Categorias</h5>
          <ul className="nav flex-column" >
            {
              loading ?
                <li className="dropdown-item">Cargando...</li>
                :
                categorias.map(cat => (
                  <li key={cat}><a className="dropdown-item my-2 border-bottom" href="#">{cat}</a></li>
                ))
            }
          </ul>
        </div>

        <div className="col-2">
          <h5>Metodos de pago</h5>
          <img src="/img/metodos-de-pago.webp" alt="imagen de metodos de pago" className="img-fluid" />
        </div>

        <div className="col-4 offset-1">
          <form>
            <h5>Obten las ultimas novedades de Mil Sabores</h5>
            <div className="d-flex w-100 gap-2">
              <input id="newsletter1" type="text" className="form-control" placeholder="Correo electronico" aria-label="Correo electronico" />
              <button className="btn btn-primary" type="submit" style={{ backgroundColor: '#8B4513', border: '0' }}>Suscribirme</button>
            </div>
          </form>
        </div>
      </div>

      <div className="d-flex justify-content-between py-4 my-4 border-top">
        <p>© 2025 Pasteleria Mil Sabores, Desarrollado por Santiago Lopez y Harold Peralta.</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#twitter"></use></svg></a></li>
          <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#instagram"></use></svg></a></li>
          <li className="ms-3"><a className="link-dark" href="#"><svg className="bi" width="24" height="24"><use xlinkHref="#facebook"></use></svg></a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
