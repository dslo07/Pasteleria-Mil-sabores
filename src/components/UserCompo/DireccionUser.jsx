import React, { useState } from "react";

export const DireccionUser = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    calle_direccion: "",
    numero_direccion: "",
    comuna_direccion: "",
    region_direccion: "",
    predeterminada: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Validación simple
    if (value.trim() === "") {
      setErrors({ ...errors, [name]: "Este campo es obligatorio" });
    } else {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "predeterminada" && formData[key].trim() === "") {
        newErrors[key] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (onSubmit) onSubmit(formData);
    console.log("Datos enviados:", formData);
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="card-title text-center mb-4">Formulario de Dirección</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Calle */}
          <div className="mb-3">
            <label className="form-label">Calle</label>
            <input
              type="text"
              name="calle_direccion"
              value={formData.calle_direccion}
              onChange={handleChange}
              className={`form-control ${errors.calle_direccion ? "is-invalid" : ""}`}
              placeholder="Ej: Av. Libertador"
              required
            />
            {errors.calle_direccion && (
              <div className="invalid-feedback">{errors.calle_direccion}</div>
            )}
          </div>

          {/* Número */}
          <div className="mb-3">
            <label className="form-label">Número</label>
            <input
              type="text"
              name="numero_direccion"
              value={formData.numero_direccion}
              onChange={handleChange}
              className={`form-control ${errors.numero_direccion ? "is-invalid" : ""}`}
              placeholder="Ej: 1234"
              required
            />
            {errors.numero_direccion && (
              <div className="invalid-feedback">{errors.numero_direccion}</div>
            )}
          </div>

          {/* Comuna */}
          <div className="mb-3">
            <label className="form-label">Comuna</label>
            <input
              type="text"
              name="comuna_direccion"
              value={formData.comuna_direccion}
              onChange={handleChange}
              className={`form-control ${errors.comuna_direccion ? "is-invalid" : ""}`}
              placeholder="Ej: Providencia"
              required
            />
            {errors.comuna_direccion && (
              <div className="invalid-feedback">{errors.comuna_direccion}</div>
            )}
          </div>

          {/* Región */}
          <div className="mb-3">
            <label className="form-label">Región</label>
            <input
              type="text"
              name="region_direccion"
              value={formData.region_direccion}
              onChange={handleChange}
              className={`form-control ${errors.region_direccion ? "is-invalid" : ""}`}
              placeholder="Ej: Región Metropolitana"
              required
            />
            {errors.region_direccion && (
              <div className="invalid-feedback">{errors.region_direccion}</div>
            )}
          </div>

          {/* Checkbox */}
          <div className="form-check mb-4">
            <input
              className="form-check-input"
              type="checkbox"
              name="predeterminada"
              checked={formData.predeterminada}
              onChange={handleChange}
              id="predeterminadaCheck"
            />
            <label className="form-check-label" htmlFor="predeterminadaCheck">
              Dirección predeterminada
            </label>
          </div>

          {/* Botón */}
          <button type="submit" className="btn btn-primary w-100">
            Guardar Dirección
          </button>
        </form>
      </div>
    </div>
  );
};

export default DireccionUser;
