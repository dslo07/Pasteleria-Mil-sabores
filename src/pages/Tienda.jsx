import React, { useState } from 'react'
import NavBar from '../components/UserCompo/NavBar'
import useFetch from '../hooks/useFetch'
import CardProd from '../components/UserCompo/CardProd'
import Footer from '../components/UserCompo/Footer'

const Tienda = () => {
  const { data: productos, loading } = useFetch("./ApiProductos.json")
  const { data: categorias } = useFetch("./ApiCategorias.json")

  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "",
    precioMin: "",
    precioMax: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFiltros({
      ...filtros,
      [name]: value
    })
  }

  const productosFiltrados = productos.filter(prod => {
    const matchNombre = prod.nombre.toLowerCase().includes(filtros.nombre.toLowerCase())
    const matchCategoria = filtros.categoria === "" || prod.categoria === filtros.categoria
    const matchPrecioMin = filtros.precioMin === "" || prod.precio >= Number(filtros.precioMin)
    const matchPrecioMax = filtros.precioMax === "" || prod.precio <= Number(filtros.precioMax)

    return matchNombre && matchCategoria && matchPrecioMin && matchPrecioMax
  })

  return (
    <>
      <NavBar />
      <div className='separador'></div>
      <section className='container '>
        <div className="card shadow-sm p-4 my-4">
          <h5 className="card-title text-center mb-3">Filtro de Productos</h5>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label">Nombre del Producto</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ej. Chocolate"
                name="nombre"
                value={filtros.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Categoría</label>
              <select
                className="form-select"
                name="categoria"
                value={filtros.categoria}
                onChange={handleChange}
              >
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
              <input
                type="number"
                className="form-control"
                name="precioMax"
                value={filtros.precioMax}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Precio Mín</label>
              <input
                type="number"
                className="form-control"
                name="precioMin"
                value={filtros.precioMin}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button
                className="btn btn-comprar w-100"
                type="button"
                onClick={() => setFiltros({ ...filtros })}
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="productos-grid">
            {
              loading ? (
                <p>Cargando productos...</p>
              ) : (
                productosFiltrados.length > 0 ? (
                  productosFiltrados.map((prod) => (
                    <div key={prod.codigo}>
                      <CardProd producto={prod} />
                    </div>
                  ))
                ) : (
                  <p>No se encontraron productos con esos filtros.</p>
                )
              )
            }
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Tienda
