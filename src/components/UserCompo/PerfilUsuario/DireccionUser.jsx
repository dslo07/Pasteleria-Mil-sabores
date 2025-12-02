import React, { useState, useEffect } from "react";
import CampoTexto from "../../CampoTexto";
import useFetch from "../../../hooks/useFetch";

const DireccionUser = ({ onSubmit, idUsuario }) => {
  // Estados
  const [formData, setFormData] = useState({
    calle_direccion: "",
    numero_direccion: "",
    comuna_direccion: "",
    region_direccion: "",
    predeterminada: false,
  });
  const [errors, setErrors] = useState({});
  const [cargando, setCargando] = useState(false);

  // Fetch de datos
  const url = idUsuario
    ? `${import.meta.env.VITE_PAGINA_PERFIL_CRUD_GET_DIRECCION}${idUsuario}`
    : null;

  const { data, loading, error } = useFetch(url);

  // Cargar datos existentes cuando lleguen del fetch
  useEffect(() => {
    if (data) {
      // Si data es un array, tomar el primer elemento
      const direccion = Array.isArray(data) ? data[0] : data.direccion || data;
      
      if (direccion) {
        setFormData({
          calle_direccion: direccion.calle_direccion || "",
          numero_direccion: direccion.numero_direccion || "",
          comuna_direccion: direccion.comuna_direccion || "",
          region_direccion: direccion.region_direccion || "",
          predeterminada: direccion.predeterminada || false,
        });
      }
    }
  }, [data]);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validación en tiempo real
    if (type !== "checkbox" && value.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        [name]: "Este campo es obligatorio",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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

    try {
      if (onSubmit) {
        await onSubmit(formData);
      }
      console.log("Datos enviados:", formData);
    } catch (error) {
      console.error("Error al guardar dirección:", error);
    } finally {
      setCargando(false);
    }
  };

  // Loading y error states
  if (loading) {
    return (
      <div className="text-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error al cargar la dirección: {error}
      </div>
    );
  }

  // Render principal
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

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          name="predeterminada"
          id="predeterminada"
          checked={formData.predeterminada}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="predeterminada">
          Establecer como dirección predeterminada
        </label>
      </div>

      <button
        type="submit"
        className="btn btn-comprar w-100 mt-3"
        disabled={cargando}
      >
        {cargando ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Guardando...
          </>
        ) : (
          "Guardar Dirección"
        )}
      </button>
    </form>
  );
};

export default DireccionUser;