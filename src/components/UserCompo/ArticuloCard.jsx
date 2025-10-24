import React from 'react'
import { Link } from 'react-router-dom'

function ArticuloCard({ titulo, descripcion, fecha,img,id }) {
  return (
    <div className="card mb-3">
      <img src={img} className="card-img-top" alt={titulo}/>
      <div className="card-body">
        <h5 className="card-title">{titulo}</h5>
        <p className="card-text">{descripcion}</p>
        <p className="card-text">
          <small className="text-body-secondary">Creado en: {fecha}</small>
        </p>
        <div className='d-flex gap-2'>
          <Link to={`/admin/blog/editar-blog/${id}`} className='text-decoration-none'>
            <button className='btn btn-comprar rounded'>Ver Artículo</button>
          </Link>
          <Link to={`/admin/blog/editar-blog/${id}`} className='text-decoration-none'>
            <button className='btn btn-comprar rounded'>Editar Artículo</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticuloCard
