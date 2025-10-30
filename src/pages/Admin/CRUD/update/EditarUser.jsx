import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

function EditarUser() {
  const [usuario, setUsuario] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar usuario desde la API
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const res = await fetch(`http://localhost:5174/api/usuario/${id}`);
        const data = await res.json();

        if (data.usuario) {
          setUsuario(data.usuario);
        } else {
          toast.error("Usuario no encontrado");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error al obtener el usuario");
      }
    };

    fetchUsuario();
  }, [id]);

  if (!usuario) return <p>Cargando usuario...</p>;

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Guardar cambios
  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5174/api/usuario/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Usuario actualizado correctamente");
        navigate(-1);
      } else {
        toast.error(data.message || "Error al actualizar el usuario");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión con el servidor");
    }
  };
  // Borar un usuario
  const borrarUser = () =>{
    const res = prompt(`Escriba el nombre del usuario para borrarlo "${usuario.nombres_cliente}"`)
    if(res == usuario.nombres_cliente){
      alert("Usuario eliminado con exito")
    }else{
      alert("Usuario no eliminado")
    }
  }

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <h2 className="mr-3">Editar usuario</h2>

        </div>
        
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <div className="row g-4">
        {/* Columna izquierda */}
        <div className="col-12 col-md-4">
          <div className="mb-3">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              className="form-control"
              name="nombres_cliente"
              value={usuario.nombres_cliente || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido Paterno</label>
            <input
              type="text"
              className="form-control"
              name="appat_cliente"
              value={usuario.appat_cliente || ""}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido Materno</label>
            <input
              type="text"
              className="form-control"
              name="apmat_cliente"
              value={usuario.apmat_cliente || ""}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="col-12 col-md-8">
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              className="form-control"
              name="email_cliente"
              value={usuario.email_cliente || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono_cliente"
              value={usuario.telefono_cliente || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de nacimiento</label>
            <input
              type="date"
              className="form-control"
              name="fecha_nacimiento"
              value={usuario.fecha_nacimiento || ""}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              className="form-select"
              name="id_rol"
              value={usuario.id_rol}
              onChange={handleChange}
            >
              <option value={1}>Cliente</option>
              <option value={2}>Admin</option>
            </select>
          </div>
          <div className="d-flex  justify-content-between">

            <button className="btn btn-comprar" onClick={handleSave}>
              Guardar Cambios
            </button>
          <button className="btn btn-danger btn-sm " onClick={() => borrarUser()}>
            Borrar usuario
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarUser;
