import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const PerfilUsuarioSKL = () => {
  return (
    <div className="container mt-5 p-4">
      <div className="row g-4">
        {/* Formulario principal */}
        <div className="col-md-7 d-none d-md-inline">
          <div className="card shadow-sm rounded-4 p-4">
            <Skeleton height={30} width="60%" />
            <Skeleton count={2} />
            <Skeleton height={38} className="mt-3" />
            <Skeleton height={38} className="mt-3" />
            <Skeleton height={38} className="mt-3" />
            <Skeleton height={38} className="mt-3" />
            <Skeleton height={40} className="mt-4" />
          </div>
        </div>

        {/* Tarjeta lateral */}
        <div className="col-md-5 my-4">
          <div className="card shadow-sm rounded-4 text-center px-4 py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Skeleton height={35} width={100} />
              <Skeleton height={35} width={120} />
            </div>

            <Skeleton circle height={120} width={120} className="mx-auto mb-3" />
            <Skeleton height={20} width="70%" className="mx-auto" />
            <Skeleton height={15} width="60%" className="mx-auto mb-3" />
            <Skeleton count={2} />

            <div className="accordion py-3">
              <Skeleton height={35} width="90%" className="mx-auto mb-2" />
              <Skeleton height={20} width="80%" className="mx-auto mb-2" />
              <Skeleton height={20} width="70%" className="mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilUsuarioSKL;
