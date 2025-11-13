import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";  // Importar los estilos de la librería

const CardStatsSKL = () => {
  return (
    <div className="p-3 col-5 border rounded card-hover">
      <div className="d-flex justify-content-between align-items-center">
        {/* Título Skeleton */}
        <Skeleton width={120} height={20} />
        {/* Imagen Skeleton */}
        <Skeleton circle width={30} height={30} />
      </div>

      <div className="mt-3">
        {/* Stats Skeleton */}
        <Skeleton width={100} height={40} />
        {/* Descripción Skeleton */}
        <Skeleton width={150} height={15} />
      </div>
    </div>
  );
};

export default CardStatsSKL;
