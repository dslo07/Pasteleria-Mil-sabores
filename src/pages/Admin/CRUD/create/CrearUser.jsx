import React, { useState } from "react";
import useMutation from "../../../../hooks/useMutation";
import toast from "react-hot-toast";

const CrearUsuario = () => {
  const { execute, isLoading, error } = useMutation();

  const [usuario, setUsuario] = useState({
    nombres: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correo: "",
    contrasena: "",
    nacimiento: "",
    rol: "2", // por defecto Admin
    estado: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUsuario({
      ...usuario,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ No se encontró el token de autenticación");
      return;
    }

    try {
      const resultado = await execute(
        "http://localhost:5174/api/usuario/crear-empleado",
        "POST",
        usuario,
        token
      );

      if (resultado) {
        toast.success(`✅ Usuario "${usuario.nombres}" creado correctamente`);

        // Reset del formulario
        setUsuario({
          nombres: "",
          apellidoPaterno: "",
          apellidoMaterno: "",
          correo: "",
          contrasena: "",
          nacimiento: "",
          rol: "2",
          estado: true,
        });
      } else {
        toast.error(error || "❌ No se pudo crear el usuario");
      }
    } catch (err) {
      console.error(err);
      toast.error("💥 Error inesperado al crear el usuario");
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
              <label className="form-label fw-semibold">Correo</label>
              <input
                type="email"
                className="form-control"
                name="correo"
                placeholder="ej: HectorLavoe@milsabores.cl"
                value={usuario.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Nombres</label>
              <input
                type="text"
                className="form-control"
                name="nombres"
                placeholder="Ej: Juanito  "
                value={usuario.nombres}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Apellido Materno</label>
              <input
                type="text"
                className="form-control"
                name="apellidoMaterno"
                placeholder="Ej: Soto"
                value={usuario.apellidoMaterno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Rol</label>
              <select
                className="form-select"
                name="rol"
                value={usuario.rol}
                onChange={handleChange}
              >
                <option value="2">Administrador</option>
                <option value="3">Vendedor</option>
                <option value="4">Supervisor</option>
              </select>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label fw-semibold">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="contrasena"
                placeholder="***********"
                value={usuario.contrasena}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Apellido Paterno</label>
              <input
                type="text"
                className="form-control"
                name="apellidoPaterno"
                placeholder="Ej: Alimaña"
                value={usuario.apellidoPaterno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Fecha de nacimiento</label>
              <input
                type="date"
                className="form-control"
                name="nacimiento"
                value={usuario.nacimiento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Botón de guardar */}
        <div className="text-end mt-4">
          <button
            type="submit"
            className="btn btn-success rounded-pill px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Guardando..." : "Guardar Usuario"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearUsuario;
