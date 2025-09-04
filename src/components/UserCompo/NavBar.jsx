import { useContext } from 'react'
import { userContext } from '../../context/user/userContext';
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import logoPasteleria from '../../img/nombre-logo.png'

function NavBar() {
  const { isLogin } = useContext(userContext)
  const { data: categorias, loading } = useFetch("./ApiCategorias.json")

  return (
    <nav className="navbar navbar-expand-lg bg-white fixed-top">
      <div className="container">
        <Link to="/">
          <img src={logoPasteleria} alt="nombre de la empresa" height="50" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
            </li>

            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
              </Link>
              <ul className="dropdown-menu">
                {
                  loading
                    ? <li className="dropdown-item">Cargando...</li>
                    : categorias.map((cat, index) => (
                      <li key={index}>
                        <Link className="dropdown-item my-2 border-bottom" to={`/productos/${cat.Nombre}`}>
                          {cat.Nombre}
                        </Link>
                      </li>
                    ))
                }
              </ul>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>

          {isLogin ? (
            <Link to="/my-car">
              <button className='btn btn-outline-success'>
                <i className="bi bi-basket3-fill"></i>
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className='btn btn-outline-success'>
                <i className="bi bi-person-circle text-success"></i>
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
