import { Router } from "express";
import pool from "../bd.js";

const blogRouter = Router();
//crear blog
blogRouter.post("/crear-blog", async (req, res) => {
  const { titulo_blogs, descripcion_blogs, imagen_blog } = req.body;

  if (!titulo_blogs ||descripcion_blogs.trim === "") {
    return res.status(400).json({ error: "Tanto el título como  del blog son obligatorio" });
  }
  
  try {
    const fecha = new Date().toISOString().split("T")[0]; // "2025-10-23"
    const result = await pool.query(
      `INSERT INTO blogs (titulo_blogs, descripcion_blogs, fecha_blogs, imagen_blogs)
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
      [titulo_blogs, descripcion_blogs, fecha, imagen_blog]

    );

    res.status(201).json({ msg: "Blog creado", blog: result.rows[0] });
  } catch (err) {
    console.error("Error al crear blog:", err);
    res.status(500).json({ error: "Error interno al crear el blog" });
  }
});


// obtener todos los Blog
blogRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//obtener blog por id
blogRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id_blogs = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "blog no encontrado" });
    }else{
      res.status(201).json({ msg: "blog Encontrado", Blog: result.rows[0] });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// actualizar categoria
blogRouter.put("/actualizar-blog/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo_blogs, descripcion_blogs, imagen_blogs } = req.body;

  // Validación
  if (!titulo_blogs?.trim()) {
    return res.status(400).json({ error: "El título del blog es obligatorio" });
  }

  try {
    const result = await pool.query(
      `UPDATE blogs SET 
        titulo_blogs = $1,
        descripcion_blogs = $2,
        imagen_blogs = $3
       WHERE id_blogs = $4
       RETURNING *`,
      [titulo_blogs, descripcion_blogs, imagen_blogs, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    res.json({ msg: "Blog actualizado", blog: result.rows[0] });
  } catch (err) {
    console.error("Error al actualizar blog:", err);
    res.status(500).json({ error: err.message });
  }
});


// borrar categoria 
blogRouter.delete("/borrar-blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM blogs WHERE id_blogs = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0 || result.rows[0] === undefined) {
      return res.status(404).json({ error: "blog no encontrado" });
    }
    res.json({ msg: "Blog borrada", categoria: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default blogRouter;
