import React, { useEffect, useState } from "react";

// borrar de pues, es un fetch de mentias
const fakeFetchVentas = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          nombre: "Otilio",
          contacto: "otilio777@gmail.com",
          direccion: "Av. España #777",
          productos: ["Torta de chocolate", "Torta de vainilla", "Torta de zanahoria"],
          estado: "En preparación",
        },
        {
          id: 2,
          nombre: "María",
          contacto: "maria@gmail.com",
          direccion: "Calle Sol #123",
          productos: ["Torta de frutilla", "Torta selva negra", "Torta de coco", "Torta de nuez", "Torta de durazno"],
          estado: "Entregado",
        },
        {
          id: 3,
          nombre: "Carlos",
          contacto: "carlos123@hotmail.com",
          direccion: "Av. Libertad #45",
          productos: ["Torta de limón", "Torta de manzana"],
          estado: "Pendiente",
        },
      ]);
    }, 1000);
  });
};
// Modal para mostrar el detalle 
const ModalDetalleVenta = ({ venta, onClose }) => {
  if (!venta) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content position-relative">
        {/* 🔹 Botón "X" de cierre arriba a la derecha */}
        <button
          onClick={onClose}
          className="btn-close position-absolute"
          style={{ top: "10px", right: "10px" }}
          aria-label="Cerrar"
        ></button>

        <h2>Detalle de la Venta</h2>
        
        <hr />
        <p>
          <strong>Nombre:</strong> {venta.nombre}
        </p>
        <p>
          <strong>Contacto:</strong> {venta.contacto}
        </p>
        <p>
          <strong>Dirección:</strong> {venta.direccion}
        </p>
        <p>
          <strong>Productos:</strong>
        </p>
        <ul>
          {venta.productos.map((producto, i) => (
            <li key={i}>{producto}</li>
          ))}
        </ul>
        <p>
          <strong>Cantidad total:</strong> {venta.productos.length}
        </p>
        <p>
          <strong>Estado:</strong> {venta.estado}
        </p>
        <div className="d-flex justify-content-between">
          <p>
            <strong>Marcar orden como:</strong>
          </p>
          <select name="" id="">
            <option value="Pendiente">Pendiente</option>
            <option value="En preparación">En preparación</option>
            <option value="Entregado">Entregado</option>
          </select>
        </div>
        
        <hr />

        <button onClick={onClose} className="btn btn-comprar mt-3">
          Guardar
        </button>
      </div>
    </div>
  );
};



const AdminVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  // Cargar datos 
  useEffect(() => {
    fakeFetchVentas().then((data) => {
      setVentas(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container my-5">
      <div className="card border-2">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Control de Ventas</h3>
          <small className="text-light">Administrador</small>
        </div>

        <div className="table-responsive">
          {loading ? (
            <p className="text-center my-3">Cargando ventas...</p>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Contacto</th>
                  <th>Dirección</th>
                  <th>Cantidad</th>
                  <th>Estado</th>
                  <th>Detalle</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta, index) => (
                  <tr key={venta.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{venta.nombre}</td>
                    <td>{venta.contacto}</td>
                    <td>{venta.direccion}</td>
                    <td>{venta.productos.length} productos</td>
                    <td>
                      <span className="badge-brown bg-warning text-dark">
                        {venta.estado}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => setVentaSeleccionada(venta)}
                      >
                        Ver detalle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal de detalle */}
      <ModalDetalleVenta
        venta={ventaSeleccionada}
        onClose={() => setVentaSeleccionada(null)}
      />
    </div>
  );
};

export default AdminVentas;
