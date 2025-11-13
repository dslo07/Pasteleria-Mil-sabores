import { useConvert } from "../../hooks/useConvert";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import useMutation from "../../hooks/useMutation";
import AlertModal from "../../components/AlerModal";

function CardProdTabla({ producto }) {
  const { execute, loading, error, response } = useMutation();
  const [modal, setModal] = useState(null);

  const url = `${import.meta.env.VITE_COMPONENTE_ADMIN_CARD_PROD_TABLA}${producto.codigo_producto}`;

  const eliminarProd = async (codigo_producto) => {
    const respuesta = prompt(
      `Ingrese el código del producto para confirmar eliminación: "${codigo_producto}"`
    );

    if (!respuesta) return;
    if (respuesta !== codigo_producto) {
      alert("Código incorrecto. No se eliminó el producto.");
      return;
    }

    const confirm = window.confirm(
      `¿Seguro que deseas eliminar el producto "${producto.nombre_producto}"?`
    );
    if (!confirm) return;

    // Ejecutamos la mutación DELETE
    const res = await execute(url, "DELETE");

    if (res && res.msg) {
      alert(`Producto "${producto.nombre_producto}" eliminado correctamente.`);
      window.location.reload();
    } else {
      alert(`No se pudo eliminar el producto: ${error || "Error desconocido"}`);
    }
  };

  return (
    <div className="card-Producto h-100 d-flex flex-column">
      {modal && (
        <AlertModal
          titulo={<><FiAlertTriangle /> Atención</>}
          desc={modal}
          setModal={setModal}
        />
      )}

      <img
        src={producto.imagen_producto}
        className="card-img-top border rounded-0"
        alt={producto.nombre_producto}
      />

      <div className="card-body d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <span className="badge">{producto.nombre_categoria}</span>
          </div>
          <h5>{producto.nombre_producto}</h5>
        </div>

        <div className="mt-auto d-flex flex-column gap-2">
          <span className="badge-precio fw-medium">
            Precio: {useConvert(producto.precio_producto)} {producto.moneda}
          </span>

          <div className="d-flex gap-2">
            <Link
              to={`/admin/productos/editar-producto/${producto.codigo_producto}`}
              className="text-decoration-none w-100"
            >
              <button className="btn btn-comprar w-100">Editar</button>
            </Link>

            <button
              className="btn btn-outline-danger py-1 px-2"
              title="Borrar producto"
              onClick={() => eliminarProd(producto.codigo_producto)}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner-border spinner-border-sm"></span>
              ) : (
                <i className="bi bi-trash-fill"></i>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProdTabla;
