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
      [usuario.rows[0].user_id, "1"] // El rol 1 es para decir que la persona es un usuario normal (no admin) "Cliente"
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
        [correo, contrasena] /*Son las varibles que se unitaran en el $..  */
      );

    const rol_usuario = await/*Esperar y unicar la Query a la bd*/  client.query(`select id_rol as rol_id from usuario_rol where id_usuario = $1`,
        [usuario.rows[0].user_id]);

    await client.query("COMMIT");
    res.status(200).json({ msg: "Login exitoso", user: usuario.rows[0], rol: rol_usuario.rows[0] /*El .rows[0] es como lista empiza en 0 recuerdar */}); 
    // Cuando la repuesta sea 200 ok pasara eb formato Json mensaje y la variable user 
    // que contiene el id del usuario. esto se pasara para el front.


    
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;