import { Router } from "express";
import pool from "../bd.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      nombre_usuario,
      appat_usuario,
      apmat_usuario,
      correo_usuario,
      contrasena_usuario,
    } = req.body;

    // if (!nombre_usuario || !appat_usuario || !correo_usuario || !contrasena_usuario) {
    //   return res.status(400).json({ error: "Faltan campos obligatorios" });
    // }

   const query = `
  INSERT INTO usuario (nombre_usuario, appat_usuario, apmat_usuario, correo_usuario, contrasena_usuario)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING user_id, nombre_usuario, correo_usuario;
`;

    const { rows } = await pool.query(query, values);
    return res.status(201).json({ user: rows[0] });

  } catch (error) {
    console.error("Error insertando usuario:", error.message);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});

export default router;