import { useState } from "react";

const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const execute = async (url, method = "POST", body = null) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });

      const json = await res.json();
      
      if (!res.ok) {
        // Crear error con la respuesta completa del servidor
        const errorObj = {
          message: json.message || json.error || "Error en la petición",
          error: json.error,
          status: res.status,
          ...json // Incluir toda la respuesta del servidor
        };
        setError(errorObj);
        throw errorObj; 
      }

      setResponse(json);
      return json;
      
    } catch (err) {
      // Si es un error de red o de parsing
      const errorObj = err.message ? err : { message: "Error de conexión", error: String(err) };
      setError(errorObj);
      throw errorObj; 
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, response };
};

export default useMutation;