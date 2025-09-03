import { useContext, useState } from 'react'
import { carContext } from '../context/carrito/carContext';
import { Link } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
function NavBar() {
    const [isLogin,setIsLogin] = useState(true)
    const { total } = useContext(carContext)
    const {data: categorias, loading} = useFetch("./ApiCategorias.json")
    
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
            <img src="src/img/nombre-logo.png" alt="nombre de la empresa" height="50"/>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Productos
                </a>
                <ul className="dropdown-menu" >
                    {
                    loading ?
                        <li className="dropdown-item">Cargando...</li>
                    :
                        categorias.map((cat, index) => (
                        <li key={index}><a className="dropdown-item my-2 border-bottom " href="#">{cat.Nombre}</a></li>
                        ))
                    }
                </ul>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#">Blog</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#" aria-disabled="true">Nosotros</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="#" aria-disabled="true">Contacto</a>
                </li>
            </ul>
            
                <Link to="/login">
                    <button className='btn btn-outline-success'>
                        <i className="bi bi-person-circle text-success" ></i>
                    </button>
                </Link>
                
                <Link to="/my-car">
                    <button className='btn btn-outline-success'>
                        <i class="bi bi-basket3-fill"></i>
                    </button>
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default NavBar