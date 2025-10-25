import React, { useState } from "react";

const CrearUser = () => {
  const [user, setUser] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    contrasena: "",
    fecha_nacimiento: "",
    isAdmin: false,
    rol: "Admin",
    estado: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5174/api/usuarios/crear-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error al crear el usuario");
      }

      const data = await res.json();
      alert(`✅ Usuario creado con éxito: ${data.usuario.nombre}`);

      // Reset formulario
      setUser({
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        correo: "",
        contrasena: "",
        fecha_nacimiento: "",
        isAdmin: false,
        rol: "Admin",
        estado: true,
      });
    } catch (error) {
      console.error(error);
      alert(`No se pudo crear el usuario: ${error.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Crear Usuario</h3>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
        <div className="row">
          {/* Columna izquierda */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                name="correo"
                placeholder="EJ: HectorLavoe@milsabores.cl"
                value={user.correo}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                value={user.nombre}
                placeholder="EJ: Juanito"
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellido Materno</label>
              <input
                type="text"
                className="form-control"
                name="apellido_materno"
                placeholder="Lavoe"
                value={user.apellido_materno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-select"
                name="rol"
                value={user.rol}
                onChange={handleChange}
              >
                <option value="Admin">Admin</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Supervisor">Supervisor</option>
              </select>
            </div>
          </div>

          {/* Columna derecha */}
          <div className="col-12 col-md-6">
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                name="contrasena"
                placeholder="***********"
                value={user.contrasena}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Apellido Paterno</label>
              <input
                type="text"
                className="form-control"
                name="apellido_paterno"
                placeholder="Alimaña"
                value={user.apellido_paterno}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de Nacimiento</label>
              <input
                type="date"
                className="form-control"
                name="fecha_nacimiento"
                value={user.fecha_nacimiento}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="text-end mt-3">
          <button type="submit" className="btn btn-comprar">
            Guardar Usuario
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearUser;
