import { Router } from "express";
import pool from "../bd.js";

const blogRouter = Router();

//crear blog
blogRouter.post("/crear-blog", async (req, res) => {
  const { titulo_blogs, descripcion_blogs, imagen_blogs } = req.body;

  if (!titulo_blogs ||descripcion_blogs.trim() === "") {
    return res.status(400).json({ error: "Tanto el título como  del blog son obligatorio" });
  }
  
  try {
    const fecha = new Date().toISOString().split("T")[0]; // "2025-10-23"
    const result = await pool.query(
      `INSERT INTO blogs (titulo_blogs, descripcion_blogs, fecha_blogs, imagen_blogs)
        VALUES ($1, $2, $3, $4) 
        RETURNING *`,
      [titulo_blogs, descripcion_blogs, fecha, imagen_blogs]

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
    const result = await pool.query(`
      SELECT
        b.id_blogs,
        b.titulo_blogs,
        b.descripcion_blogs,
        b.imagen_blogs 
      FROM blogs b;
    `);

    const blogs = result.rows.map(b => {
      let imagenFinal = null;

      if (b.imagen_blogs) {
        const valor = b.imagen_blogs.toString();

        // Si empieza con "http", asumimos que ya es una URL válida
        if (valor.startsWith("http")) {
          imagenFinal = valor;
        } else {
          // Si realmente es binario, convertir a base64
          const base64 = b.imagen.toString("base64");
          imagenFinal = `data:image/png;base64,${base64}`;
        }
      }

      return {
        ...b,
        imagen: imagenFinal,
      };
    });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//obtener blog por id
blogRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`
      SELECT
        id_blogs,
        titulo_blogs,
        descripcion_blogs,
        imagen_blogs
      FROM blogs 
      WHERE id_blogs = $1;
    `, [id]); 

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    const b = result.rows[0];

    let imagenFinal = null;

    if (b.imagen_blogs) {
      const valor = b.imagen_blogs.toString();

      if (valor.startsWith("http")) {
        imagenFinal = valor;
      } else {
        const base64 = b.imagen_blogs.toString("base64"); 
        imagenFinal = `data:image/png;base64,${base64}`;
      }
    }

    res.json({
      ...b,
      imagen: imagenFinal,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// actualizar categoria
blogRouter.put("/actualizar-blog/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo_blogs, descripcion_blogs, imagen } = req.body;

  if (!titulo_blogs?.trim()) {
    return res.status(400).json({ error: "El título del blog es obligatorio" });
  }

  try {
    const result = await pool.query(
      `UPDATE blogs SET 
        titulo_blogs = $1,
        descripcion_blogs = $2,
        imagen_blogs = COALESCE($3, imagen_blogs)
       WHERE id_blogs = $4
       RETURNING *`,
      [titulo_blogs, descripcion_blogs, imagen, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog no encontrado" });
    }

    res.json({ msg: "Blog actualizado", blog: result.rows[0] });
  } catch (err) {
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
