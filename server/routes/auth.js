// auth.js
import jwt from "jsonwebtoken";
import "dotenv/config"; 

// ====== Generar un token con { id, rol } ======
export function signToken({ id, rol }, opts = {}) {
  return jwt.sign(
    { id, rol },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1d", ...opts }
  );
}

// ====== Middleware: verificar token ======
export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(403).json({ msg: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
}

// ====== Helper: obtener { id, rol } desde el token directamente ======
export function getIdRolFromToken(token) {
  try {
    const { id, rol } = jwt.verify(token, process.env.JWT_SECRET);
    return { id, rol };
  } catch {
    return null;
  }
}

// ====== Helper: obtener { id, rol } desde la request ======
export function getIdRolFromReq(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) return null;
  return getIdRolFromToken(token);
}

// ====== Middleware: permitir solo admins ======
export function isAdmin(req, res, next) {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado: solo admins" });
  }
  next();
}
