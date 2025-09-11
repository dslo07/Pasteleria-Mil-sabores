import { Router } from "express";
import pool from "../bd.js";
import bcrypt from "bcrypt";

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

    // Validación mínima
    if (!nombre_usuario || !appat_usuario || !correo_usuario || !contrasena_usuario) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Unicidad de correo
    const dup = await pool.query(
      "SELECT 1 FROM Usuario WHERE correo_usuario = $1",
      [correo_usuario]
    );
    if (dup.rowCount > 0) {
      return res.status(409).json({ error: "Correo ya registrado" });
    }

    // Hash de contraseña (recomendado)
    const hash = await bcrypt.hash(contrasena_usuario, 10);

    const query = `
      INSERT INTO Usuario (nombre_usuario, appat_usuario, apmat_usuario, correo_usuario, contrasena_usuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id_usuario, nombre_usuario, appat_usuario, apmat_usuario, correo_usuario, created_at;
    `;
    const values = [nombre_usuario, appat_usuario, apmat_usuario || null, correo_usuario, hash];

    const { rows } = await pool.query(query, values);
    return res.status(201).json({ user: rows[0] });

  } catch (error) {
    console.error("Error insertando usuario:", error);
    return res.status(500).json({ error: "Error al registrar usuario" });
  }
});

export default router;
