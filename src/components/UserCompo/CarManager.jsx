import React, { useContext } from 'react';
import CardCar from './CardCar';
import { carContext } from '../../context/carrito/carContext';


export const CarManager = () => {
  const { productos, loading } = useContext(carContext);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center my-4">
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column text-center my-4">
        <iframe
          src="https://lottie.host/embed/5e40b073-b377-4478-90b6-3063979e9173/1flk4fzWIT.lottie"
          style={{ border: 'none', width: '200px', height: '200px' }}
        ></iframe>
        <h2 className="normal-text mt-3">No tienes productos aún </h2>
      </div>
    );
  }

  return (
    <div className="car-manager-list">
      {productos.map((prod) => (
        <CardCar key={prod.codigo_producto} producto={prod} />
      ))}
    </div>
  );
};

export default CarManager;
