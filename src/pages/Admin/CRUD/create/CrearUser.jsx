import React, { useState } from "react";
import useMutation from "../../../../hooks/useMutation";
import toast from "react-hot-toast";

const CrearUsuario = () => {
  const { execute, loading } = useMutation();

  const [usuario, setUsuario] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    contrasena: "",
    nacimiento: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const resetForm = () => {
    setUsuario({
      nombres: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      correo: "",
      contrasena: "",
      nacimiento: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${import.meta.env.VITE_PAGINA_ADMIN_CRUD_CREAR_USER}`;

    const payload = {
      nombres: usuario.nombres.trim(),
      apellidoPaterno: usuario.apellidoPaterno.trim(),
      apellidoMaterno: usuario.apellidoMaterno.trim(),
      correo: usuario.correo.trim().toLowerCase(),
      contrasena: usuario.contrasena,
      nacimiento: usuario.nacimiento,
    };

    try {
      await execute(url, "POST", payload);
      toast.success(`Usuario "${usuario.nombres}" creado correctamente`);
      resetForm();
    } catch (err) {
      let errorMessage = err?.error || err?.message || "Error al crear el usuario";

      // Mejorar mensajes de errores comunes
      if (errorMessage.includes("duplicate key") && errorMessage.toLowerCase().includes("email")) {
        errorMessage = "Este correo electrónico ya está registrado";
      } else if (errorMessage.includes("violates not-null constraint")) {
        errorMessage = "Faltan campos obligatorios";
      } else if (errorMessage.includes("invalid input syntax")) {
        errorMessage = "Formato de datos inválido";
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center fw-bold">Crear Usuario</h3>

      <form
        onSubmit={handleSubmit}
        className="p-4 shadow border rounded bg-white"
        style={{ maxWidth: "850px", margin: "0 auto" }}
      >
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Nombres <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="nombres"
                placeholder="Ej: Juan"
                value={usuario.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Apellido Paterno <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="apellidoPaterno"
                placeholder="Ej: Pérez"
                value={usuario.apellidoPaterno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Apellido Materno <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="apellidoMaterno"
                placeholder="Ej: González"
                value={usuario.apellidoMaterno}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Correo <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                name="correo"
                placeholder="usuario@milsabores.cl"
                value={usuario.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Contraseña <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="contrasena"
                placeholder="Mínimo 6 caracteres"
                value={usuario.contrasena}
                onChange={handleChange}
                required
                minLength={6}
              />
              <small className="text-muted">Mínimo 6 caracteres</small>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Fecha de nacimiento <span className="text-danger">*</span>
              </label>
              <input
                type="date"
                className="form-control"
                name="nacimiento"
                value={usuario.nacimiento}
                onChange={handleChange}
                required
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="text-end mt-4">
          <button
            type="submit"
            className="btn btn-success rounded-pill px-4 py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Guardando...
              </>
            ) : (
              "Guardar Usuario"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearUsuario;