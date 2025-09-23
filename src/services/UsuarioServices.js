const API_URL = "http://localhost:5174/api/usuario";

export async function registrarUsuario(form) {
  const res = await fetch(`${API_URL}/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al registrar");
  }

  return await res.json();
}

// Login usuario
export async function loginUsuario({ correo, contrasena }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Error al iniciar sesión");
  }

  return await res.json(); // { msg, user }
}
