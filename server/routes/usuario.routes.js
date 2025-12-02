// routes/usuarios.js
import { Router } from "express";
import pool from "../bd.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { signToken, verifyToken, isAdmin } from "./auth.js"; // <-- usa el isAdmin de auth.js
dotenv.config();

const router = Router();

// ===== Registro de usuario ===== //
router.post("/crear", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const {
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      correo,
      contrasena,
      nacimiento,
    } = req.body;

    const email = String(correo || "").trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(String(contrasena || ""), 10);

    // 1) Crear usuario (activo por defecto TRUE en DB)
    const usuario = await client.query(
      `INSERT INTO usuario (email_usuario, contrasena_usuario)
       VALUES ($1, $2)
       RETURNING id_usuario AS user_id, email_usuario`,
      [email, hashedPassword]
    );

    // 2) Crear cliente
    const cliente = await client.query(
      `INSERT INTO cliente (nombres_cliente, appat_cliente, apmat_cliente)
       VALUES ($1, $2, $3)
       RETURNING id_cliente AS client_id`,
      [nombres, apellidoPaterno, apellidoMaterno]
    );

    // 3) Rol por defecto = 1 (cliente)
    await client.query(
      `INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ($1, $2)`,
      [usuario.rows[0].user_id, 1]
    );

    // 4) Vínculo usuario-cliente
    await client.query(
      `INSERT INTO cliente_usuario (id_usuario, id_cliente) VALUES ($1, $2)`,
      [usuario.rows[0].user_id, cliente.rows[0].client_id]
    );

    // 5) Datos cliente (si tu columna admite nulls, OK; si no, valida 'nacimiento')
    await client.query(
      `INSERT INTO datos_cliente (id_cliente, email_cliente, fecha_nacimiento)
       VALUES ($1, $2, $3)`,
      [cliente.rows[0].client_id, email, nacimiento || null]
    );

    // 6) Emitir token post-registro (opcional)
    const payload = { id: usuario.rows[0].user_id, rol: "cliente" };
    const token = signToken(payload); // <-- usa signToken, no jwt.sign directo

    await client.query("COMMIT");

    return res.status(201).json({
      msg: "Usuario creado",
      token,
      user: {
        id: usuario.rows[0].user_id,
        email: usuario.rows[0].email_usuario,
        rol: "cliente", // <-- consistente en minúsculas
      },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("CREAR ERROR:", err);
    return res.status(500).json({ msg: "Error interno" });
  } finally {
    client.release();
  }
});

// ===== Login de usuario ===== //
router.post("/login", async (req, res) => {
  const client = await pool.connect();
  try {
    const correo = String(req.body.correo || "").trim().toLowerCase();
    const contrasena = String(req.body.contrasena || "");

    // 1) Verificar usuario activo
    const { rows } = await client.query(
      `SELECT id_usuario, contrasena_usuario, email_usuario
       FROM usuario
       WHERE email_usuario = $1 AND activo = TRUE`,
      [correo]
    );
    if (rows.length === 0) {
      return res.status(400).json({ msg: "Correo o contraseña inválidos" });
    }
    const user = rows[0];

    // 2) Verificar contraseña
    const ok = await bcrypt.compare(contrasena, user.contrasena_usuario);
    if (!ok) {
      return res.status(400).json({ msg: "Correo o contraseña inválidos" });
    }

    // 3) Rol (primer rol)
    const { rows: rolesRows } = await client.query(
      `SELECT r.descripcion_rol
         FROM usuario_rol ur
         JOIN rol r ON r.id_rol = ur.id_rol
        WHERE ur.id_usuario = $1`,
      [user.id_usuario]
    );
    const rolUser = rolesRows[0].descripcion_rol?.toLowerCase();

    // 4) Token con { id, rol }
    const token = signToken({ id: user.id_usuario, rol: rolUser });

    return res.status(200).json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ msg: "Error interno" });
  } finally {
    client.release();
  }
});

//me para leer { id, rol } desde el token ya verificado
router.get("/me", verifyToken, (req, res) => {
  const { id, rol } = req.user;
  res.json({ id, rol });
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


// crear un usario desde administrador 
router.post("/crear-empleado", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const { nombres, apellidoPaterno, apellidoMaterno, correo, contrasena, nacimiento } = req.body;

    // LOG PARA DEBUG
    console.log("Datos recibidos:", { nombres, apellidoPaterno, apellidoMaterno, correo, nacimiento });

    const hashedPassword = await bcrypt.hash(contrasena, 10);
    console.log("Password hasheado correctamente");

    const usuario = await client.query(
      `INSERT INTO usuario (email_usuario, contrasena_usuario) VALUES ($1, $2) RETURNING id_usuario AS user_id`,
      [correo, hashedPassword]
    );
    console.log("Usuario creado con ID:", usuario.rows[0].user_id);

    const cliente = await client.query(
      "INSERT INTO cliente (nombres_cliente, appat_cliente, apmat_cliente) VALUES ($1, $2, $3) RETURNING id_cliente AS client_id",
      [nombres, apellidoPaterno, apellidoMaterno]
    );
    console.log("Cliente creado con ID:", cliente.rows[0].client_id);

    await client.query(
      "INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ($1, $2)",
      [usuario.rows[0].user_id, "2"]
    );
    console.log("Rol asignado");

    await client.query(
      "INSERT INTO cliente_usuario (id_usuario, id_cliente) VALUES ($1, $2)",
      [usuario.rows[0].user_id, cliente.rows[0].client_id]
    );
    console.log("Cliente-Usuario vinculado");

    await client.query(
      "INSERT INTO datos_cliente (id_cliente, email_cliente, fecha_nacimiento) VALUES ($1, $2, $3)",
      [cliente.rows[0].client_id, correo, nacimiento]
    );
    console.log("Datos cliente insertados");

    const datos_cliente = await client.query(`SELECT
            c.nombres_cliente as nombres,
            c.appat_cliente as apellidoPaterno,
            c.apmat_cliente as apellidoMaterno,
            c.rut_cliente as rut,
            dc.fecha_nacimiento as nacimiento,
            (d.calle_direccion || ' ' || d.comuna_direccion || ' ' || d.numero_direccion || ' ' || d.region_direccion) AS direccion
            FROM usuario
            as u JOIN cliente_usuario as cs on (u.id_usuario = cs.id_usuario)
            JOIN cliente as c on (c.id_cliente = cs.id_cliente)
            JOIN datos_cliente as dc on (c.id_cliente = dc.id_cliente)
            LEFT JOIN direccion_cliente as direc on (c.id_cliente = direc.id_cliente)
            LEFT JOIN direccion as d on (d.id_direccion = direc.id_direccion)
            WHERE u.id_usuario = $1;`,
        [usuario.rows[0].user_id]);

    await client.query("COMMIT");
    console.log("Transacción completada");

    const token = jwt.sign(
      { id: usuario.rows[0].user_id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({ msg: "Usuario creado", user: usuario.rows[0], token });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ ERROR COMPLETO:", err); // MÁS DETALLE
    console.error("Mensaje:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// ===== Actualizar solo datos de perfil del usuario ===== //
router.put("/actualizar-perfil/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const {
    nombres_cliente,
    appat_cliente,
    apmat_cliente,
    email_cliente,
    fecha_nacimiento,
    telefono_cliente
  } = req.body;

  // ✅ Validación básica de campos
  if (!nombres_cliente || !appat_cliente || !apmat_cliente) {
    return res.status(400).json({
      error: "Faltan datos obligatorios",
      details: "nombres_cliente, appat_cliente y apmat_cliente son requeridos"
    });
  }

  if (!email_cliente) {
    return res.status(400).json({
      error: "Correo electrónico requerido",
      details: "email_cliente no puede estar vacío"
    });
  }

  if (!req.user || req.user.id !== parseInt(id)) {
    return res.status(403).json({ error: "No puedes modificar otro usuario" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Verificar cliente asociado al usuario
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

    // Actualizar datos personales
    await client.query(
      `UPDATE cliente
       SET nombres_cliente = $1, appat_cliente = $2, apmat_cliente = $3
       WHERE id_cliente = $4`,
      [nombres_cliente, appat_cliente, apmat_cliente, id_cliente]
    );

    // Actualizar datos de contacto
    await client.query(
      `UPDATE datos_cliente
       SET email_cliente = $1, fecha_nacimiento = $2, telefono_cliente = $3
       WHERE id_cliente = $4`,
      [email_cliente, fecha_nacimiento, telefono_cliente, id_cliente]
    );

    await client.query("COMMIT");

    // Respuesta al cliente
    res.json({
      success: true,
      msg: "Perfil actualizado correctamente",
      updatedUser: {
        nombres_cliente,
        appat_cliente,
        apmat_cliente,
        email_cliente,
        fecha_nacimiento,
        telefono_cliente
      },
    });
    
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error al actualizar perfil:", err);

    // Regresar error más descriptivo
    res.status(500).json({
      error: "No se pudo actualizar el perfil",
      details: err.message,
      stack: err.stack, // opcional: útil en dev
    });
  } finally {
    client.release();
  }
});

// cambiar la direccion del usuario
router.put("/actualizar-direccion/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // id del usuario
  const { calle_direccion, numero_direccion, comuna_direccion, region_direccion } = req.body;

  if (!calle_direccion || !numero_direccion || !comuna_direccion || !region_direccion) {
    return res.status(400).json({
      error: "Faltan datos obligatorios",
      details: "Todos los datos son requeridos"
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Obtener id_cliente asociado al id_usuario
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

    // Insertar la nueva direccion y obtener su id
    const direccionResult = await client.query(
      `INSERT INTO direccion (calle_direccion, numero_direccion, comuna_direccion, region_direccion)
       VALUES ($1, $2, $3, $4) RETURNING id_direccion`,
      [calle_direccion, numero_direccion, comuna_direccion, region_direccion]
    );

    const id_direccion = direccionResult.rows[0].id_direccion;

    // Asociar la dirección con el cliente
    await client.query(
      `INSERT INTO direccion_cliente (id_cliente, id_direccion)
       VALUES ($1, $2)`,
      [id_cliente, id_direccion]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      msg: "Dirección actualizada correctamente",
      updatedUser: { calle_direccion, numero_direccion, comuna_direccion, region_direccion },
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error al actualizar perfil:", err);
    res.status(500).json({
      error: "No se pudo actualizar la dirección del perfil",
      details: err.message,
    });
  } finally {
    client.release();
  }
});


// obtener  direccion
router.get("/direccion/:id", verifyToken, async (req, res) => {
  const { id } = req.params; // id del usuario

  const client = await pool.connect();

  try {
    const result = await client.query(
      `SELECT 
          d.id_direccion,
          d.calle_direccion,
          d.numero_direccion,
          d.comuna_direccion,
          d.region_direccion
        FROM usuario AS u
        JOIN cliente_usuario AS cu
            ON u.id_usuario = cu.id_usuario
        JOIN cliente AS c
            ON cu.id_cliente = c.id_cliente
        JOIN direccion_cliente AS dc
            ON c.id_cliente = dc.id_cliente
        JOIN direccion AS d
            ON dc.id_direccion = d.id_direccion
        WHERE u.id_usuario = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No se encontraron direcciones para este usuario" });
    }

    // Enviar solo las direcciones como array
    res.json(result.rows);

  } catch (err) {
    console.error("Error al obtener direcciones:", err);
    res.status(500).json({
      error: "No se pudo obtener las direcciones",
      details: err.message
    });
  } finally {
    client.release();
  }
});




export default router;
