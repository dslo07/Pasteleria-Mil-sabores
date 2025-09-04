import { Link } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import CardProd from './CardProd';
function ProductosMain() {
    const {data: productos, loading} = useFetch("./ApiProductos.json")
    
  return (
    <section>
      <div className="container">

        <div className="d-flex justify-content-between">
          <div>
            <h2 className="display-5 fw-bold lh-1 mb-3">Nuestros Productos</h2>
            <p>
              Explora nuestra selección de productos más destacados, cuidadosamente elegidos para ti. <br />
              ¡Encuentra calidad, buen precio y diseño en un solo lugar, y lleva tu compra al siguiente nivel hoy mismo!
            </p>
          </div>
          <div className="d-flex align-items-end">
              <Link to="/tienda" className=' text-decoration-none'>
                  <button className="btn btn-general" id="ver-todos-btn" style={{ marginBottom: '16px' }}>
                      Ver todos
                  </button>
              </Link>
          </div>
        </div>

        <div className="row">
          <div className="productos-grid" >
            {
              loading ? (
                <p>Cargando productos...</p>
              ) : (
                productos.slice(0,4).map((prod) => (
                  <div key={prod.codigo}>
                    <CardProd producto={prod} />
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>

      
    </section>
  )
}

export default ProductosMain
