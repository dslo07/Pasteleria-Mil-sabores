import jwt from "jsonwebtoken";

// ===== Verifica el token JWT ===== //
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  // Formato esperado: "Bearer <token>"
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(403).json({ msg: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, rol, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
}

// ===== Verifica si el usuario es admin ===== //
export function isAdmin(req, res, next) {
  // En tu payload usas "rol", no "role"
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado: solo admins" });
  }
  next();
}
