import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Importar los estilos

function CardProdTablaSKL() {
  return (
    <div className="card-Producto h-100 w-100 d-flex flex-column">
      <Skeleton
        height={200}
        className="card-img-top border rounded-0"
        containerClassName="mb-3"
      />

      <div className="card-body d-flex flex-column flex-grow-1">
        <div>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <Skeleton width={80} height={20} className="badge" />
          </div>
          <Skeleton width="60%" height={25} className="mt-2" />
        </div>

        <div className="mt-auto d-flex flex-column gap-2">
          <Skeleton width="40%" height={20} className="badge-precio fw-medium" />

          <div className="d-flex gap-2">
            <Skeleton width="45%" height={35} className="btn btn-comprar w-100" />
            <Skeleton width="20%" height={35} className="btn btn-outline-danger py-1 px-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardProdTablaSKL;
