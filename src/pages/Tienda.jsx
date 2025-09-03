import React from 'react'
import NavBar from '../components/UserCompo/NavBar'
import useFetch from '../hooks/useFetch'
import CardProd from '../components/UserCompo/CardProd'
import Footer from '../components/UserCompo/Footer'

const Tienda = () => {

  const {data: productos,loading} = useFetch("./ApiProductos.json")
  const { data: categorias } = useFetch("./ApiCategorias.json")


  
  return (
    <>
      <NavBar/>
      <section className='container '>
      <div className="card shadow-sm p-4 my-4">
      <h5 className="card-title text-center  mb-3">Filtro de Productos</h5>
      <div className="row g-3">
                <div className="col-md-3">
          <label className="form-label">Nombre del Producto</label>
          <input type="text" className="form-control" placeholder="Ej. Chocolate" />
        </div>
        <div className="col-md-3">
          <label className="form-label">Categoría</label>
<select className="form-select">
  <option value="">Todas las categorías</option>
  {
    categorias.map(cat => (
      <option key={cat.Nombre} value={cat.Nombre}>
        {cat.Nombre}
      </option>
    ))
  }
</select>
        </div>
        <div className="col-md-2">
          <label className="form-label">Precio Máx</label>
          <input type="number" className="form-control"  />
        </div>
        <div className="col-md-2">
          <label className="form-label">Precio Mín</label>
          <input type="number" className="form-control" />
        </div>


        <div className="col-md-2 d-flex align-items-end">
          <button className="btn btn-comprar w-100" >Filtrar</button>
        </div>
      </div>
    </div>






        <div className="row">
            <div className="productos-grid" >
              {
                loading ? (
                  <p>Cargando productos...</p>
                ) : (
                  productos.map((prod) => (
                    <div key={prod.codigo}>
                      <CardProd producto={prod} />
                    </div>
                  ))
                )
              }
            </div>
          </div>
      </section>
      <Footer/>
    </>
  )
}


export default Tienda