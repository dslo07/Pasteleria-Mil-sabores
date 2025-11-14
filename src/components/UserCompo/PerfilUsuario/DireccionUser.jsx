import React, { useState } from "react";
import CampoTexto from "../../CampoTexto";

const DireccionUser = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    calle_direccion: "",
    numero_direccion: "",
    comuna_direccion: "",
    region_direccion: "",
    predeterminada: false,
  });

  const [errors, setErrors] = useState({});
  const [cargando, setCargando] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    
    // Validar campos obligatorios
    Object.keys(formData).forEach((key) => {
      if (key !== "predeterminada" && formData[key].trim() === "") {
        newErrors[key] = "Este campo es obligatorio";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setCargando(true);
    
    if (onSubmit) {
      await onSubmit(formData);
    }
    
    console.log("Datos enviados:", formData);
    setCargando(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CampoTexto
        label="Calle"
        name="calle_direccion"
        value={formData.calle_direccion}
        onChange={handleChange}
        placeholder="Ej: Av. Libertador"
        error={errors.calle_direccion}
      />

      <div className="row mb-3">
        <div className="col-md-6">
          <CampoTexto
            label="Número"
            name="numero_direccion"
            value={formData.numero_direccion}
            onChange={handleChange}
            placeholder="Ej: 1234"
            error={errors.numero_direccion}
          />
        </div>
        <div className="col-md-6">
          <CampoTexto
            label="Comuna"
            name="comuna_direccion"
            value={formData.comuna_direccion}
            onChange={handleChange}
            placeholder="Ej: Providencia"
            error={errors.comuna_direccion}
          />
        </div>
      </div>

      <CampoTexto
        label="Región"
        name="region_direccion"
        value={formData.region_direccion}
        onChange={handleChange}
        placeholder="Ej: Región Metropolitana"
        error={errors.region_direccion}
      />
      <button
        type="submit"
        className="btn btn-comprar w-100 mt-3"
        disabled={cargando}
      >
        {cargando ? "Guardando..." : "Guardar Dirección"}
      </button>
    </form>
  );
};

export default DireccionUser;

