import { Router } from "express";
import pool from "../bd.js";

const categoriaRouter = Router();

// crear categoria
categoriaRouter.post("/crear-categoria", async (req, res) => {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO categoria (nombre_categoria) VALUES ($1) RETURNING *",
      [nombre]
    );
    res.status(201).json({ msg: "Categoría creada", categoria: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// obtener todos las categorias
categoriaRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categoria");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//obtener categoria por id
categoriaRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM categoria WHERE id_categoria = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }else{
      res.status(201).json({ msg: "Categoría Encontrada", categoria: result.rows[0] });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// actualizar categoria
categoriaRouter.put("/actualizar-categoria/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ error: "El nombre de la categoría es obligatorio" });
  }
  try {
    const result = await pool.query(
      "UPDATE categoria SET nombre_categoria = $1 WHERE id_categoria = $2 RETURNING *",
      [nombre, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json({ msg: "Categoría actualizada", categoria: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// borrar categoria 
categoriaRouter.delete("/borrar-categoria/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM categoria WHERE id_categoria = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.json({ msg: "Categoría borrada", categoria: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default categoriaRouter;
