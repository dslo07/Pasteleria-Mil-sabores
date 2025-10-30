import { Router } from "express";
import pool from "../bd.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
dotenv.config();
const router = Router();


// Validación rápida
if (!process.env.JWT_SECRET) {
  console.error("❌ ERROR: No se encontró la variable JWT_SECRET en el .env");
  process.exit(1); // termina la ejecución del servidor
} else {
  console.log("✅ JWT_SECRET cargado correctamente");
}
//ruta para crear un usuario (pagina de Registro)
router.post("/crear", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { nombres, apellidoPaterno, apellidoMaterno, correo, contrasena, nacimiento } = req.body;

    // encriptar contraseña
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
      [usuario.rows[0].user_id, "1"] // Rol normal
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

    // Generar JWT
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















//ruta para el login de usuario (pagina de Login)x
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

    // Verificar contraseña
    const validPass = await bcrypt.compare(contrasena, usuario.contrasena_usuario);
    if (!validPass) return res.status(401).json({ msg: "Contraseña incorrecta" });

    // Obtener rol
    const rolQuery = await client.query(
      "SELECT id_rol AS rol_id FROM usuario_rol WHERE id_usuario = $1",
      [usuario.user_id]
    );

    const rol = rolQuery.rows[0].rol_id === 1 ? "user" : "admin";

    // Generar JWT
    const token = jwt.sign({ id: usuario.user_id, role: rol }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    await client.query("COMMIT");
    res.status(200).json(
      { 
        msg: "Login exitoso",
        user: { id: usuario.user_id },
        rol,
        token
      });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: token });
  } finally {
    client.release();
  }
});


// ===== Desde aca empiezan las nuevas rutas del CRUD ===== //


//obtener todos los usuarios
router.get("/", async (_req, res) => {
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
        cl.apmat_cliente
      FROM cliente_usuario AS clu
      INNER JOIN cliente AS cl ON cl.id_cliente = clu.id_cliente
      INNER JOIN datos_cliente AS da ON da.id_cliente = cl.id_cliente
      INNER JOIN usuario AS u ON u.id_usuario = clu.id_usuario
      INNER JOIN usuario_rol as ur on u.id_usuario = ur.id_usuario
      order by rol asc 
    `);


    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
     res.status(200).json({ msg: "Usuario encontrado", usuarios: result.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//obtener datos de usuario por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
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

//Borrar usuario por id
router.delete("/borrar-usuario/:id", async (req, res) => {
const { id } = req.params;

  try {
    // 1️ Borra relaciones 
    await pool.query("DELETE FROM usuario_rol WHERE id_usuario = $1", [id]);
    await pool.query("DELETE FROM empleado_usuario WHERE id_usuario = $1", [id]);
    await pool.query("DELETE FROM cliente_usuario WHERE id_usuario = $1", [id]);

    // 2️  borra el usuario
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


export default router;