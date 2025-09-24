import {useState} from "react";
import NavBar from '../../components/UserCompo/NavBar'
import Footer from '../../components/UserCompo/Footer'
const ModalPerfilUser = ({ usuario })=>{
  return(
    <>
          <div className="col-md-7 container mb-4">
      <div className="card shadow-sm rounded-4 p-4">
        <h1 className="mb-3">Bienvenido, {usuario.nombre}</h1>
        <p className="text-muted mb-4">Editar información personal</p>

        <form>
          {/* Nombres */}
          <div className="mb-3">
            <label htmlFor="inputNombres" className="form-label">Nombres</label>
            <input
              type="text"
              className="form-control"
              id="inputNombres"
              value={usuario.nombre}
              onChange={() => {}}
            />
          </div>

          {/* Apellidos */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputAPPat" className="form-label">Apellido Paterno</label>
              <input
                type="text"
                className="form-control"
                id="inputAPPat"
                value={usuario.apellidoPat}
                onChange={() => {}}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputAPMat" className="form-label">Apellido Materno</label>
              <input
                type="text"
                className="form-control"
                id="inputAPMat"
                value={usuario.apellidoMat}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* RUT y Nacimiento */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputRut" className="form-label">RUT</label>
              <input
                type="text"
                className="form-control"
                id="inputRut"
                value={usuario.rut}
                onChange={() => {}}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputNacimiento" className="form-label">Nacimiento</label>
              <input
                type="date"
                className="form-control"
                id="inputNacimiento"
                value={usuario.nacimiento}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="mb-3">
            <label htmlFor="inputDireccion" className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              id="inputDireccion"
              value={usuario.direccion}
              onChange={() => {}}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Confirmar cambios
          </button>
        </form>
      </div>
    </div>
    </>
  )
} 
export default ModalPerfilUser