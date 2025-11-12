import { useState } from "react";

const useMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const execute = async (url, method = "POST", body = null) => {
    setLoading(true);
    setError(null);
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
      if (!res.ok) throw new Error(json.message || "Error en la peticion");

      setResponse(json);
      return json;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, response };
};

export default useMutation;
