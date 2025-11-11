import { useState } from "react";

const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const execute = async (url, method = "POST", body = null) => {
    setLoading(true);
    setError(null);

    // Tomar token directamente del localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      setError("No hay token disponible");
      return;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✨ Cabecera correcta
        },
        body: body ? JSON.stringify(body) : null,
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Error en la petición");

      setResponse(json);
      return json;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, response };
};

export default useMutation;
