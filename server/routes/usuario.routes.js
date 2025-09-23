import { Router } from "express";
import pool from "../bd.js";

const router = Router();
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
      nacimiento
    } = req.body;

    const usuario = await client.query(`INSERT INTO usuario (email_usuario, contrasena_usuario) VALUES ($1, $2) RETURNING id_usuario AS user_id`,
        [correo, contrasena]
      );

    const cliente = await client.query(
      "INSERT INTO cliente (nombres_cliente, appat_cliente, apmat_cliente) VALUES ($1, $2, $3) RETURNING id_cliente AS client_id",
      [nombres, apellidoPaterno, apellidoMaterno]
    );

    await client.query(
      "INSERT INTO usuario_rol (id_usuario, id_rol) VALUES ($1, $2)",
      [usuario.rows[0].user_id, "1"] // el rol 1 es para decir que la persona es un usuario normal (no admin) "Cliente"
    );
    
    await client.query(
      "INSERT INTO cliente_usuario (id_usuario, id_cliente) VALUES ($1, $2)",
      [usuario.rows[0].user_id, cliente.rows[0].client_id]
    );

    const datos_cliente = await client.query(
      "INSERT INTO datos_cliente (id_cliente, email_cliente, fecha_nacimiento) VALUES ($1, $2, $3)",
      [cliente.rows[0].client_id, correo, nacimiento]
    );
    await client.query("COMMIT");
    res.status(201).json({ msg: "Usuario creado", user: usuario.rows[0] });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});


router.post("/login", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const {
      correo,
      contrasena
    } = req.body;

    const usuario = await client.query(`SELECT id_usuario AS user_id FROM usuario WHERE email_usuario = $1 AND contrasena_usuario = $2`,
        [correo, contrasena]
      );

    if (usuario.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    await client.query("COMMIT");
    res.status(200).json({ msg: "Login exitoso", user: usuario.rows[0] });

    
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;