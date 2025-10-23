import { Router } from "express";
import pool from "../bd.js";

const productoRouter = Router();

// const productoBody = {
//   id_producto: "integer",
//   codigo_producto: "string",
//   id_categoria: "integer",
//   nombre_producto: "string",
//   descripcion_producto: "string",
//   precio_producto: "float",
//   image : "string / bytea",
// };


//validar que los datos no esten vacios
const validarDatosProducto = (producto) => {
  const {
    codigo_producto,
    id_categoria,
    nombre_producto,
    descripcion_producto,
    precio_producto,
    imagen_producto
  } = producto;

  if (
    !codigo_producto ||
    !id_categoria ||
    !nombre_producto ||
    !descripcion_producto ||
    !precio_producto ||
    !imagen_producto
  ) {
    return false;
  }
  return true;
};


// crear producto
productoRouter.post("/crear-producto", async (req, res) => {
  const {  
    codigo_producto,
    id_categoria,
    nombre_producto,
    decripcion_producto,
    precio_producto,
    imagen_producto
  } = req.body;

  if (validarDatosProducto(req.body)) {
    return res.status(400).json({ error: "No puede enviar datos vacios" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO producto (codigo_producto,id_categoria,nombre_producto,decripcion_producto,precio_producto,imagen_producto) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [codigo_producto, id_categoria, nombre_producto, decripcion_producto, precio_producto, imagen_producto]
    );
    res.status(201).json({ msg: "producto creado", producto: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// obtener todos las categorias
productoRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query("SELECT * FROM producto");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//obtener categoria por id
productoRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM producto WHERE id_producto = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }else{
      res.status(201).json({ msg: "Producto Encontrado", categoria: result.rows[0] });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// actualizar categoria
productoRouter.put("/actualizar-producto/:id", async (req, res) => {
  const { id } = req.params;
  const {  
    codigo_producto,
    id_categoria,
    nombre_producto,
    decripcion_producto,
    precio_producto,
    imagen_producto
  } = req.body;

  if (validarDatosProducto(req.body)) {
    return res.status(400).json({ error: "No puede enviar datos vacios" });
  }

  try {
const result = await pool.query(
      `UPDATE producto SET 
          codigo_producto = $1,
          id_categoria = $2,
          nombre_producto = $3,
          decripcion_producto = $4,
          precio_producto = $5,
          imagen_producto = $6
       WHERE id_producto = $7
       RETURNING *`,
      [codigo_producto, id_categoria, nombre_producto, decripcion_producto, precio_producto, imagen_producto, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "producto no encontrado" });
    }
    res.json({ msg: "Producto actualizado", categoria: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// borrar categoria 
productoRouter.delete("/borrar-producto/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM producto WHERE id_producto = $1 RETURNING *",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ msg: "Producto borrado", categoria: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default productoRouter;
















//17