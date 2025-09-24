import {useState} from "react";
import NavBar from '../../components/UserCompo/NavBar'
import Footer from '../../components/UserCompo/Footer'
import ModalPerfilUser from "../../components/UserCompo/ModalPerfilUser";
const PerfilUsuario = ()=>{
  const [mostrar,setMostrar] = useState(false)
    const usuario = {
    nombre: "Santiago",
    apellidoPat: "lopez",
    apellidoMat: "marulanda",
    rut: "12.123.456-7",
    nacimiento: "nacimiento",
    direccion: "direccion",
  }

  return(
    <>
      <NavBar/>
      <div className="container mt-5 p-4">
  <div className="row g-4">
    <div className="col-md-7 d-none d-md-inline">
      <div className="card shadow-sm rounded-4 p-4">
        <h1 className="mb-3">Bienvenido, {usuario.nombre}</h1>
        <p className="text-muted mb-4">Editar información personal</p>

        <form>
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

    <div className="col-md-5">
      <div className="card shadow-sm rounded-4 text-center p-4">
        <img
          src="https://avatars.githubusercontent.com/u/147568951?s=400&u=2f8703b990535553a8b915da8db89f4a11115349&v=4"
          alt={`Foto de perfil de ${usuario.nombre}`}
          className="rounded-circle border border-3 mx-auto mb-3"
          width="120"
        />

        <h4 className="fw-bold mb-0">{usuario.nombre}</h4>
        <p className="text-muted small">{usuario.correo}</p>

        <hr className="my-3" />

        <ul className="list-unstyled text-start px-3">
          <li className="mb-2">
            <i className="bi bi-person-vcard me-2 text-primary"></i>
            <strong>RUT:</strong> {usuario.rut}
          </li>
          <li className="mb-2">
            <i className="bi bi-geo-alt me-2 text-danger"></i>
            <strong>Dirección:</strong> {usuario.direccion}
          </li>
          <li className="mb-2">
            <i className="bi bi-bag-check me-2 text-success"></i>
            <strong>Compras:</strong> 5
          </li>
        </ul>

        <button className="btn btn-outline-primary w-100 rounded-pill mt-3 d-md-none d-inline" onClick={()=>setMostrar(!mostrar)}>
          Editar Perfil
        </button>
      </div>
    </div>
  </div>
</div>
      {
        mostrar && <ModalPerfilUser usuario={usuario}/>
      }
      <Footer/>
    </>
  )
} 
export default PerfilUsuario