import {jwtDecode} from 'jwt-decode';

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token); // decodifica el payload automáticamente
    if (!exp) return true; // si no tiene exp, consideramos que expiró

    const now = Math.floor(Date.now() / 1000); // tiempo actual en segundos
    return exp < now;
  } catch (error) {
    console.error("Error al decodificar JWT:", error);
    return true; // token inválido se considera expirado
  }
}
 