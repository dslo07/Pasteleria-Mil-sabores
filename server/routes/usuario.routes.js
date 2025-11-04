// routes/usuarios.js
import { Router } from "express";
import pool from "../bd.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

const router = Router();

// ===== Middleware de autenticación ===== //
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ msg: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado: solo admins" });
  }
  next();
};

// ===== Validación rápida ===== //
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: No se encontró JWT_SECRET en .env");
  process.exit(1);
} else {
  console.log("✅ JWT_SECRET cargado correctamente");
}

// ===== Registro de usuario ===== //
router.post("/crear", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { nombres, apellidoPaterno, apellidoMaterno, correo, contrasena, nacimiento } = req.body;

    const hashedPassword = await bcrypt.hash(contrasena, 10);

    const usuario = await client.query(
      `INSERT INTO usuario (email_usuario, contrasena_usuario) VALUES ($1, $2) RETURNING id_usuario AS user_id`,
      [correo, hashedPassword]
    );

    const cliente = await client.query(
      "INSERT INTO cliente (nombres_cliente, appat_cliente, apmat_cliente) VALUES ($1, $2, $3) RETURNING id_cliente AS client_id",
      [nombres, apellidoPaterno, apellidoMaterno]
    );

    await client.query(
      "INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ($1, $2)",
      [usuario.rows[0].user_id, "1"]
    );

    await client.query(
      "INSERT INTO cliente_usuario (id_usuario, id_cliente) VALUES ($1, $2)",
      [usuario.rows[0].user_id, cliente.rows[0].client_id]
    );

    await client.query(
      "INSERT INTO datos_cliente (id_cliente, email_cliente, fecha_nacimiento) VALUES ($1, $2, $3)",
      [cliente.rows[0].client_id, correo, nacimiento]
    );

    await client.query("COMMIT");

    const token = jwt.sign(
      { id: usuario.rows[0].user_id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ msg: "Usuario creado", user: usuario.rows[0], token });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// ===== Login de usuario ===== //  
router.post("/login", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { correo, contrasena } = req.body;

    const usuarioQuery = await client.query(
      `SELECT id_usuario AS user_id, contrasena_usuario FROM usuario WHERE email_usuario = $1`,
      [correo]
    );

    if (!usuarioQuery.rows.length) {
      return res.status(401).json({ msg: "Usuario no encontrado" });
    }

    const usuario = usuarioQuery.rows[0];

    const validPass = await bcrypt.compare(contrasena, usuario.contrasena_usuario);
    if (!validPass) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const rolQuery = await client.query(
      "SELECT id_rol AS rol_id FROM usuario_rol WHERE id_usuario = $1",
      [usuario.user_id]
    );

    const rol = rolQuery.rows[0].rol_id === 1 ? "user" : "admin";

    const token = jwt.sign({ id: usuario.user_id, role: rol }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await client.query("COMMIT");
    res.status(200).json({ msg: "Login exitoso", user: { id: usuario.user_id }, rol, token });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// ===== Obtener todos los usuarios (solo admin) ===== //
router.get("/", verifyToken, isAdmin, async (_req, res) => {
  try {
    const result = await pool.query(`
        SELECT 
          clu.id_usuario,
          clu.id_cliente,
          CASE 
            WHEN ur.id_rol = 1 THEN 'Cliente'
            WHEN ur.id_rol = 2 THEN 'Admin'
            ELSE 'Desconocido'
          END AS rol,
          da.email_cliente, 
          da.telefono_cliente,
          da.fecha_nacimiento,
          cl.nombres_cliente,
          cl.appat_cliente,
          cl.apmat_cliente,
          u.activo
        FROM cliente_usuario AS clu
        INNER JOIN cliente AS cl ON cl.id_cliente = clu.id_cliente
        INNER JOIN datos_cliente AS da ON da.id_cliente = cl.id_cliente
        INNER JOIN usuario AS u ON u.id_usuario = clu.id_usuario
        INNER JOIN usuario_rol AS ur ON u.id_usuario = ur.id_usuario
        ORDER BY rol ASC;
    `);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Usuarios no encontrados" });
    }

    res.status(200).json({ msg: "Usuarios encontrados", usuarios: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Obtener usuario por ID ===== //
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  // solo permitir ver su propio perfil o admin
  if (req.user.role !== "admin" && parseInt(req.user.id) !== parseInt(id)) {
    return res.status(403).json({ msg: "Acceso denegado" });
  }

  try {
    const result = await pool.query(`
      SELECT 
        clu.id_usuario,
        clu.id_cliente,
        ur.id_rol,
        da.email_cliente, 
        da.telefono_cliente,
        da.fecha_nacimiento,
        cl.nombres_cliente,
        cl.appat_cliente,
        cl.apmat_cliente
      FROM cliente_usuario AS clu
      INNER JOIN cliente AS cl ON cl.id_cliente = clu.id_cliente
      INNER JOIN datos_cliente AS da ON da.id_cliente = cl.id_cliente
      INNER JOIN usuario AS u ON u.id_usuario = clu.id_usuario
      INNER JOIN usuario_rol as ur on u.id_usuario = ur.id_usuario
      WHERE u.id_usuario = $1 
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({ msg: "Usuario encontrado", usuario: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ===== Borrar usuario por ID (solo admin) ===== //
router.delete("/borrar-usuario/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM usuario_rol WHERE id_usuario = $1", [id]);
    await pool.query("DELETE FROM empleado_usuario WHERE id_usuario = $1", [id]);
    await pool.query("DELETE FROM cliente_usuario WHERE id_usuario = $1", [id]);

    const result = await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.json({ msg: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ msg: "Error al eliminar usuario", error: error.message });
  }
});
// ===== Actualizar Datos de usuario ===== //
router.put("/actualizar-usuario/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const {
    nombres_cliente,
    appat_cliente,
    apmat_cliente,
    email_cliente,
    fecha_nacimiento,
    telefono_cliente,
    activo,
    id_rol
  } = req.body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ Verificar cliente asociado al usuario
    const clienteResult = await client.query(
      `SELECT clu.id_cliente
       FROM cliente_usuario AS clu
       WHERE clu.id_usuario = $1`,
      [id]
    );

    if (clienteResult.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Cliente no encontrado para el usuario" });
    }

    const id_cliente = clienteResult.rows[0].id_cliente;

    // 2️⃣ Actualizar datos personales
    await client.query(
      `UPDATE cliente
       SET nombres_cliente = $1, appat_cliente = $2, apmat_cliente = $3
       WHERE id_cliente = $4`,
      [nombres_cliente, appat_cliente, apmat_cliente, id_cliente]
    );

    // 3️⃣ Actualizar datos de contacto
    await client.query(
      `UPDATE datos_cliente
       SET email_cliente = $1, fecha_nacimiento = $2, telefono_cliente = $3
       WHERE id_cliente = $4`,
      [email_cliente, fecha_nacimiento, telefono_cliente, id_cliente]
    );

    // 4️⃣ Actualizar estado del usuario
    await client.query(
      `UPDATE usuario
       SET activo = $1
       WHERE id_usuario = $2`,
      [activo, id]
    );

    // 5️⃣ Actualizar rol del usuario
    await client.query(
      `UPDATE usuario_rol
       SET id_rol = $1
       WHERE id_usuario = $2`,
      [id_rol, id]
    );

    await client.query("COMMIT");

    // 6️⃣ Respuesta al cliente
    res.json({
      success: true,
      msg: "Usuario actualizado correctamente",
      updatedUser: {
        nombres_cliente,
        appat_cliente,
        apmat_cliente,
        email_cliente,
        fecha_nacimiento,
        telefono_cliente,
        activo,
        id_rol
      },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error al actualizar usuario:", err);
    res.status(500).json({
      error: "Error interno del servidor",
      details: err.message,
    });
  } finally {
    client.release();
  }
});


export default router;
