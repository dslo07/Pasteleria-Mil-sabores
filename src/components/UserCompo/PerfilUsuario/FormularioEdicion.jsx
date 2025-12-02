import CampoTexto from "../../CampoTexto";

const FormularioEdicion = ({ 
  usuario, 
  handleChange, 
  handleGuardar, 
  cargandoUpdate,
  
}) => {
  return (


        <form onSubmit={handleGuardar}>
          <CampoTexto
            label="Nombres"
            name="nombres_cliente"
            value={usuario.nombres_cliente}
            onChange={handleChange}
          />

          <div className="row mb-3">
            <div className="col-md-6">
              <CampoTexto
                label="Apellido Paterno"
                name="appat_cliente"
                value={usuario.appat_cliente}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <CampoTexto
                label="Apellido Materno"
                name="apmat_cliente"
                value={usuario.apmat_cliente}
                onChange={handleChange}
              />
            </div>
          </div>

          <CampoTexto
            label="Correo"
            name="email_cliente"
            type="email"
            value={usuario.email_cliente}
            onChange={handleChange}
          />

          <CampoTexto
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            type="date"
            value={usuario.fecha_nacimiento}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-comprar w-100 mt-3"
            disabled={cargandoUpdate}
          >
            {cargandoUpdate ? "Guardando..." : "Confirmar cambios"}
          </button>
        </form>

  );
};

export default FormularioEdicion;