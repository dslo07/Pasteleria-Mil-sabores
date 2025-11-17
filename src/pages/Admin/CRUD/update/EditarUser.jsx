import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import useMutation from "../../../../hooks/useMutation";
import useFetch from "../../../../hooks/useFetch";

const API_URL = import.meta.env.VITE_PAGINA_ADMIN_CRUD_EDITAR_USER;

function EditarUser() {
  const [usuario, setUsuario] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const { execute, loading, error } = useMutation();

    const fetchUsuario = async () => {
      const result =  useFetch(`${API_URL}/${id}`);
      console.log(result);

      if (result && result.usuario) {
        setUsuario(result.usuario);
        
      } else {
        toast.error("No se pudo cargar el usuario.");
      }
    };

    fetchUsuario();

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">no encontraron...</span>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({
      ...prev,
      [name]:
        value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSave = async () => {
    const result = await execute(
      `${API_URL}/actualizar-usuario/${id}`,
      "PUT",
      usuario
    );

    if (result) {
      toast.success("Usuario actualizado correctamente");
      navigate(-1);
    } else {
      toast.error(error || "Error al actualizar el usuario");
    }
  };

  const eliminarUser = async () => {
    const confirm = prompt(
      `Escriba el nombre del usuario para desactivarlo: "${usuario.nombres_cliente}"`
    );
    if (confirm !== usuario.nombres_cliente) {
      toast.error("Usuario no desactivado");
      return;
    }

    const result = await execute(`${API_URL}/${id}`, "PUT", {
      ...usuario,
      activo: false,
    });

    if (result) {
      toast.success("Usuario desactivado con éxito");
      navigate(-1);
    } else {
      toast.error(error || "Error al desactivar el usuario");
    }
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2>Editar usuario</h2>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>

      <div className="row g-4 mt-3">
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

          <div className="mb-3">
            <label className="form-label">Estado</label>
            <select
              className="form-select"
              name="activo"
              value={usuario.activo}
              onChange={handleChange}
            >
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
            </select>
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
              placeholder="+56 9 1234 1234"
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

          <div className="d-flex justify-content-between">
            <button
              className="btn btn-comprar"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar Cambios"}
            </button>
          
            <button
              className="btn btn-danger btn-sm"
              onClick={eliminarUser}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Usuario Eliminado"}
            </button> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarUser;
