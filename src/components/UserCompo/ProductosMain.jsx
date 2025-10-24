import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import CardProd from './CardProd';

function ProductosMain() {
  const { data, loading, error } = useFetch(" http://localhost:5174/api/productos");
  const productos = Array.isArray(data) ? data : [];

  return (
    <section className="container py-5">
      <div className="d-flex justify-content-between">
        <div>
          <h2 className="lh-1 mb-3">Nuestros Productos</h2>
          <p>
            Explora nuestra selección de productos más destacados, cuidadosamente elegidos para ti. <br />
            <span className="d-none d-md-flex">
              ¡Encuentra calidad, buen precio y diseño en un solo lugar, y lleva tu compra al siguiente nivel hoy mismo!
            </span>
          </p>
        </div>
        <div className="d-flex align-items-end">
          <Link to="/tienda" className="text-decoration-none">
            <button
              className="btn btn-general"
              id="ver-todos-btn"
              style={{ marginBottom: "16px" }}
            >
              Ver Tienda
            </button>
          </Link>
        </div>
      </div>

      <div className="productos-grid mt-4">
        {loading && <p>Cargando productos...</p>}
        {error && <p>Error al cargar productos.</p> }
        {!loading && !error && productos.length === 0 && (
          <p>No hay productos disponibles.</p>
        )}
        {!loading &&
          !error &&
          productos.slice(0, 4).map((prod) => (
            <CardProd key={prod.codigo} producto={prod} />
          ))}
      </div>
    </section>
  );
}

export default ProductosMain;
