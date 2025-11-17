// TableSKL.js (Componente Skeleton para la tabla)
import React from "react";

const TableSKL = () => {
  return (
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
        {/* Crear 5 filas de skeleton */}
        {Array(5)
          .fill()
          .map((_, index) => (
            <tr key={index}>
              <th scope="row">
                <div className="skeleton skeleton-text" />
              </th>
              <td><div className="skeleton skeleton-text" /></td>
              <td><div className="skeleton skeleton-text" /></td>
              <td><div className="skeleton skeleton-text" /></td>
              <td><div className="skeleton skeleton-text" /></td>
              <td><div className="skeleton skeleton-text" /></td>
              <td><div className="skeleton skeleton-button" /></td>
              <td><div className="skeleton skeleton-button" /></td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TableSKL;
