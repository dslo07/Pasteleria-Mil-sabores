import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import useMutation from "../../../../hooks/useMutation";
import useFetch from "../../../../hooks/useFetch";

const API_URL = import.meta.env.VITE_PAGINA_ADMIN_CRUD_EDITAR_USER;

function EditarUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState(null);
  const { execute, loading, error } = useMutation();

  // Fetch user
  const {
    data: result,
    loading: fetching,
    error: fetchError,
  } = useFetch(`${API_URL}${id}`);

  // Load user into state
  useEffect(() => {
    if (result && result.usuario) {
      setUsuario(result.usuario);
    } else if (fetchError) {
      toast.error("No se pudo cargar el usuario.");
    }
  }, [result, fetchError]);

  // Show loading spinner while fetching the user
  if (fetching || !usuario) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "50vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando usuario...</span>
        </div>
      </div>
    );
  }

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Convertir string a boolean para el campo activo
    if (name === "activo") {
      processedValue = value === "true";
    }
    
    // Convertir string a number para el campo id_rol
    if (name === "id_rol") {
      processedValue = parseInt(value, 10);
    }
    
    setUsuario((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  // Save changes
  const handleSave = async () => {
    const payload = {
      nombres_cliente: usuario.nombres_cliente,
      appat_cliente: usuario.appat_cliente,
      apmat_cliente: usuario.apmat_cliente,
      email_cliente: usuario.email_cliente,
      fecha_nacimiento: usuario.fecha_nacimiento,
      telefono_cliente: usuario.telefono_cliente,
      activo: usuario.activo,
      id_rol: usuario.id_rol,
    };

    const result = await execute(
      `${API_URL}actualizar-usuario/${id}`,
      "PUT",
      payload
    );

    if (result) {
      toast.success("Usuario actualizado correctamente");
      navigate(-1);
    } else {
      toast.error(error || "Error al actualizar el usuario");
    }
  };

  // Disable user
  const eliminarUser = async () => {
    const confirmacion = prompt(
      `Escriba el nombre del usuario para desactivarlo: "${usuario.nombres_cliente}"`
    );

    if (confirmacion !== usuario.nombres_cliente) {
      toast.error("Usuario no desactivado");
      return;
    }

    const payload = {
      nombres_cliente: usuario.nombres_cliente,
      appat_cliente: usuario.appat_cliente,
      apmat_cliente: usuario.apmat_cliente,
      email_cliente: usuario.email_cliente,
      fecha_nacimiento: usuario.fecha_nacimiento,
      telefono_cliente: usuario.telefono_cliente,
      activo: false,
      id_rol: usuario.id_rol,
    };

    const result = await execute(`${API_URL}/${id}`, "PUT", payload);

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

            {/* <button
              className="btn btn-danger btn-sm"
              onClick={eliminarUser}
              disabled={loading}
            >
              {loading ? "Eliminando..." : "Desactivar Usuario"}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarUser;