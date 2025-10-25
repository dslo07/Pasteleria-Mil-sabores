import React, { useState } from 'react'
import NavBar from '../../components/UserCompo/NavBar'
import useFetch from '../../hooks/useFetch'
import CardProd from '../../components/UserCompo/CardProd'
import Footer from '../../components/UserCompo/Footer'

const Tienda = () => {
  const { data: productos = [], loading } = useFetch("http://localhost:5174/api/productos")
  const { data: categorias = [] } = useFetch("http://localhost:5174/api/categorias")

  const [filtros, setFiltros] = useState({
    nombre: "",
    categoria: "",
    precioMin: "",
    precioMax: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Lógica de filtrado
  const productosFiltrados = productos.filter(prod => {
    const nombreMatch = prod.nombre_producto?.toLowerCase().includes(filtros.nombre.toLowerCase())
    const categoriaMatch = !filtros.categoria || prod.nombre_categoria === filtros.categoria
    const precio = Number(prod.precio) || 0
    const precioMinMatch = !filtros.precioMin || precio >= Number(filtros.precioMin)
    const precioMaxMatch = !filtros.precioMax || precio <= Number(filtros.precioMax)

    return nombreMatch && categoriaMatch && precioMinMatch && precioMaxMatch
  })

  const limpiarFiltros = () => {
    setFiltros({
      nombre: "",
      categoria: "",
      precioMin: "",
      precioMax: ""
    })
  }

  return (
    <>
      <div className='separador'></div>
      <section className='container'>
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
                {categorias.map(cat => (
                  <option key={cat.id || cat.nombre_categoria} value={cat.nombre_categoria}>
                    {cat.nombre_categoria}
                  </option>
                ))}
              </select>
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

            <div className="col-md-2 d-flex align-items-end gap-2">
              <button
                className="btn btn-comprar w-100"
                type="button"
                onClick={limpiarFiltros}
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>

        <div className="row productos-grid">
          {loading ? (
            <p>Cargando productos...</p>
          ) : productosFiltrados.length > 0 ? (
            productosFiltrados.map(prod => (
              <div key={prod.codigo}>
                <CardProd producto={prod} />
              </div>
            ))
          ) : (
            <p>No se encontraron productos con esos filtros.</p>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Tienda
