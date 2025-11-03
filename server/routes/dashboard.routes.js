import { Router } from "express";
import pool from "../bd.js";

const dashboardRouter = Router();
//calcular estadisticas
dashboardRouter.get("/", async (req, res) => {
  try {
    // 1. Total productos
    const productosResult = await pool.query(`SELECT COUNT(*) AS total_productos FROM producto`);

    // 2. Total clientes (rol = 1)
    const clientesResult = await pool.query(`
      SELECT COUNT(*) AS total_clientes
      FROM usuario
      INNER JOIN usuario_rol ON usuario_rol.id_usuario = usuario.id_usuario
      WHERE id_rol = 1
    `);

    // 3. Total administradores (rol = 2)
    const adminsResult = await pool.query(`
      SELECT COUNT(*) AS total_admins
      FROM usuario
      INNER JOIN usuario_rol ON usuario_rol.id_usuario = usuario.id_usuario
      WHERE id_rol = 2
    `);

    // 4. Total blogs
    const blogsResult = await pool.query(`SELECT COUNT(*) AS total_blogs FROM blogs`);

    // Respuesta combinada
    res.status(200).json({
      msg: "Estadísticas calculadas con éxito",
      productos: productosResult.rows[0].total_productos,
      clientes: clientesResult.rows[0].total_clientes,
      administradores: adminsResult.rows[0].total_admins,
      blogs: blogsResult.rows[0].total_blogs
    });
    
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Algo sucedió mal" });
  }
});
export default dashboardRouter;