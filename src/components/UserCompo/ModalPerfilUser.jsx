
const ModalPerfilUser = ({ usuario,handleChange })=>{
  return(
    <>
          <div className="col-md-7 container mb-4">
      <div className="card shadow-sm rounded-4 p-4">
        <h1 className="mb-3">Bienvenido, {usuario.nombres_cliente}</h1>
        <p className="text-muted mb-4">Editar información personal</p>

<form>
                <div className="mb-3">
                  <label htmlFor="inputNombres" className="form-label">
                    Nombres
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombres_cliente"
                    value={usuario.nombres_cliente}
                    onChange={handleChange}
                  />
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="inputAPPat" className="form-label">
                      Apellido Paterno
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="appat_cliente"
                      value={usuario.appat_cliente}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputAPMat" className="form-label">
                      Apellido Materno
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="apmat_cliente"
                      value={usuario.apmat_cliente}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label">
                    Correo
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email_cliente"
                    value={usuario.email_cliente}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputNacimiento" className="form-label">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="fecha_nacimiento"
                    value={usuario.fecha_nacimiento}
                    onChange={handleChange}
                  />
                </div>

                <button type="submit" className="btn btn-comprar w-100 mt-3">
                  Confirmar cambios
                </button>
              </form>
      </div>
    </div>
    </>
  )
} 
export default ModalPerfilUser