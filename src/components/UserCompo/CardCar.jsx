import React from 'react'

const CardCar = ({producto}) => {
  return (
    <div className="card mb-3" style={{maxWidth: "540px"}}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={producto.imagenURL} className="img-fluid rounded-start" alt={producto.Nombre}/>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title fs-6">{producto.categoria}</h5>
            <p className="fs-6">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCar