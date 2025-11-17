import lgoEmpresa  from "../../img/image.png"

const InfoEmpresa = () => {
  return (
    <div className="nosotros-page">
      {/* HISTORIA */}
      <section className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="mb-3">Nuestra Historia</h2>
            <p className="text-muted">
              Pastelería Mil Sabores nació en 1975 como un pequeño negocio
              familiar en Santiago de Chile. Con esfuerzo, dedicación y amor por
              la repostería tradicional, creció hasta convertirse en un referente
              nacional.
            </p>
            <p className="text-muted">
              En 1995 participamos en la creación de la torta más grande del mundo,
              obteniendo un Récord Guinness que marcó un antes y después en nuestra
              trayectoria.
            </p>
            <p className="text-muted">
              Hoy, seguimos innovando y renovando nuestra plataforma online para
              entregar una experiencia moderna, rápida y accesible a nuestros clientes.
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src={lgoEmpresa}
              className="img-fluid rounded shadow"
              alt="Historia Pastelería"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section py-5 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h2 className="display-5">50+</h2>
              <p>Años de experiencia</p>
            </div>
            <div className="col-md-4">
              <h2 className="display-5">100k+</h2>
              <p>Clientes felices</p>
            </div>
            <div className="col-md-4">
              <h2 className=" display-5">1</h2>
              <p>Récord Guinness obtenido</p>
            </div>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="valores-section py-5 text-center">
        <div className="container">
          <h2 className="mb-4">Nuestros Valores</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="valor-card p-4">
                <h4>Calidad</h4>
                <p>Ingredientes frescos y recetas tradicionales que garantizan el mejor sabor.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="valor-card p-4">
                <h4>Pasión</h4>
                <p>Amor por la repostería, dedicación en cada detalle y en cada postre.</p>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="valor-card p-4">
                <h4>Innovación</h4>
                <p>Buscamos reinventarnos constantemente para sorprender a nuestros clientes.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfoEmpresa;
