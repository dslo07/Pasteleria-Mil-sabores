export async function fetchMe(token) {
  const res = await fetch(`${import.meta.env.VITE_FETCHME_URL}/me`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!res.ok) {
    throw new Error("No se pudo obtener el perfil del usuario");
  }

  return await res.json();
}
