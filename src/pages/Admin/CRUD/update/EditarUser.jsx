import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

function EditarUser() {
  const { data: usuarios } = useFetch("/ApiUsuarios.json");
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState();

  // Cargar producto desde el catálogo
  useEffect(() => {
    if (usuarios) {
      const user = usuarios.find(p => p.user == id);
      if (user) setUsuario(user);
    }
  }, [id, usuarios]);

  if (!usuario) return <p>Usuario no encontrado</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };


  // const handleGuardar = () => {
  //   const productos = JSON.parse(localStorage.getItem("productos")) || [];
  //   const index = productos.findIndex(p => p.codigo === producto.codigo);

  //   if (index >= 0) {
  //     productos[index] = producto;
  //   } else {
  //     productos.push(producto);
  //   }

  //   localStorage.setItem("productos", JSON.stringify(productos));
  //   toast.success("Producto guardado correctamente");
  //   navigate("/admin/productos"); // Redirige a la lista de productos
  // };

return (
  <div className="container my-4">
    <div className="d-flex justify-content-between">
      <h2 className="mb-4">Editar usuario</h2>
      <div>
        <button className="btn btn-comprar" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>

    <div className="row g-4">
      {/* Columna izquierda: Datos principales */}
      <div className="col-12 col-md-4">
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido Paterno</label>
          <input
            type="text"
            className="form-control"
            name="apellido_paterno"
            value={usuario.apellido_paterno}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Apellido Materno</label>
          <input
            type="text"
            className="form-control"
            name="apellido_materno"
            value={usuario.apellido_materno}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Columna derecha: Más información */}
      <div className="col-12 col-md-8">
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input
            type="email"
            className="form-control"
            name="correo"
            value={usuario.correo}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="contrasena"
            value={usuario.contrasena}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            type="date"
            className="form-control"
            name="fecha_nacimiento"
            value={usuario.fecha_nacimiento}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rol</label>
          <select
            className="form-select"
            name="rol"
            value={usuario.rol}
            onChange={handleChange}
          >
            <option value="Usuario">Usuario</option>
            <option value="Admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Estado</label>
          <select
            className="form-select"
            name="estado"
            value={usuario.estado}
            onChange={handleChange}
          >
            <option value={true}>Activo</option>
            <option value={false}>Inactivo</option>
          </select>
        </div>

        <button className="btn btn-comprar" onClick={handleGuardar}>
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
);

}

export default EditarUser;
