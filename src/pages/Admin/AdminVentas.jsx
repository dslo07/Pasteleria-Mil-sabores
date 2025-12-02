import React, { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import TableSKL from "../../components/skeletons/TableSKL";
// API FALSA
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
          estado: "Preparación",
        },
        {
          id: 2,
          nombre: "María",
          contacto: "maria@gmail.com",
          direccion: "Calle Sol #123",
          productos: ["Torta de frutilla", "Torta selva negra", "Torta de coco"],
          estado: "Entregado",
        },
        {
          id: 3,
          nombre: "Carlos",
          contacto: "carlos123@hotmail.com",
          direccion: "Av. Libertad #45",
          productos: ["Torta de limón", "Torta de manzana", "Torta de chocolate", "Torta de vainilla"],
          estado: "Despachado",
        },
        {
          id: 4,
          nombre: "Lucía",
          contacto: "lucia@gmail.com",
          direccion: "Calle Norte #22",
          productos: ["Torta tres leches"],
          estado: "Cancelado",
        },
      ]);
    }, 1000);
  });
};
const ModalDetalleVenta = ({ venta, onClose, actualizarEstado }) => {
  if (!venta) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content position-relative">
        <button
          onClick={onClose}
          className="btn-close position-absolute"
          style={{ top: "10px", right: "10px" }}
          aria-label="Cerrar"
        ></button>

        <h2>Detalle de la Venta</h2>
        <hr />
        <p><strong>Nombre:</strong> {venta.nombre}</p>
        <p><strong>Contacto:</strong> {venta.contacto}</p>
        <p><strong>Dirección:</strong> {venta.direccion}</p>
        <p><strong>Productos:</strong></p>
        <ul>
          {venta.productos.map((producto) => (
            <li key={producto}>{producto}</li>
          ))}
        </ul>
        <p><strong>Cantidad total:</strong> {venta.productos.length}</p>
        <div>
          <label className="fw-bold">Estado Actual:</label> <br/>
          <select
            name="estado"
            className="form-control"
            value={venta.estado}
            onChange={(e) => actualizarEstado(venta.id, e.target.value)}
          >
            <option value="Preparación">En Preparación</option>
            <option value="Despachado">Despachado</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>
        </div>
        <hr />
        <button onClick={onClose} className="btn btn-comprar mt-3">
          Cerrar
        </button>
      </div>
    </div>
  );
};



const AdminVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [listaVentas, setListaVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("Todos");
  const [ordenCantidad, setOrdenCantidad] = useState("default");
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);

  // Cargar datos
  useEffect(() => {
    fakeFetchVentas().then((data) => {
      setVentas(data);
      setListaVentas(data);
      setLoading(false);
    });
  }, []);

  // Filtro combinado (texto + estado + orden)
  useEffect(() => {
    let filtradas = [...ventas];

    // Filtrar por texto
    if (busqueda.trim() !== "") {
      const texto = busqueda.toLowerCase();
      filtradas = filtradas.filter(
        (v) =>
          v.nombre.toLowerCase().includes(texto) ||
          v.contacto.toLowerCase().includes(texto) ||
          v.direccion.toLowerCase().includes(texto)
      );
    }

    // Filtrar por estado
    if (filtroEstado !== "Todos") {
      filtradas = filtradas.filter(
        (v) => v.estado.toLowerCase() === filtroEstado.toLowerCase()
      );
    }

    // Ordenar por cantidad de productos
    if (ordenCantidad === "mayor") {
      filtradas.sort((a, b) => b.productos.length - a.productos.length);
    } else if (ordenCantidad === "menor") {
      filtradas.sort((a, b) => a.productos.length - b.productos.length);
    }

    setListaVentas(filtradas);
  }, [busqueda, filtroEstado, ordenCantidad, ventas]);

  return (
    <div className="container my-5">
      <div className="card border-2">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Control de Ventas</h3>
          <small className="text-light">Administrador</small>
        </div>

        {/* Filtros */}
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-3 mt-3 mx-3 flex-wrap">
          {/*  Buscador */}
          <div className="d-flex align-items-center border rounded bg-white px-2 py-1 flex-grow-1">
            <IoSearchSharp className="me-2 text-muted" />
            <input
              type="text"
              placeholder="Buscar por nombre, contacto o dirección..."
              className="form-control border-0 shadow-none"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Filtro por estado */}
          <select
            className="form-select w-auto"
            value={filtroEstado}
            onChange={(e) => setFiltroEstado(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="Preparación">Preparación</option>
            <option value="Despachado">Despachado</option>
            <option value="Entregado">Entregado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          {/* Filtro por cantidad */}
          <select
            className="form-select w-auto"
            value={ordenCantidad}
            onChange={(e) => setOrdenCantidad(e.target.value)}
          >
            <option value="default">Ordenar por cantidad</option>
            <option value="mayor">Mayor a menor</option>
            <option value="menor">Menor a mayor</option>
          </select>
        </div>

        <div className="table-responsive mt-3">
          {loading ? (
            <TableSKL/>
          ) : listaVentas.length > 0 ? (
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
                {listaVentas.map((venta, index) => (
                  <tr key={venta.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{venta.nombre}</td>
                    <td>{venta.contacto}</td>
                    <td>{venta.direccion}</td>
                    <td>{venta.productos.length} productos</td>
                    <td>
                      <span
                        className="badge-brown"
                      >
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
          ) : (
            <p className="text-center my-4 text-muted">
              No se encontraron ventas con los filtros aplicados.
            </p>
          )}
        </div>
      </div>

      {/*  Modal de detalle */}
      <ModalDetalleVenta
        venta={ventaSeleccionada}
        onClose={() => setVentaSeleccionada(null)}
      />
    </div>
  );
};

export default AdminVentas;
