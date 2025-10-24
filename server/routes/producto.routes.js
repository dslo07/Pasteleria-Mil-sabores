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
// obtener todos los productos
productoRouter.get("/", async (_req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        p.codigo_producto,
        c.nombre_categoria,
        p.nombre_producto,
        p.decripcion_producto,
        p.precio_producto,
        p.imagen_producto
      FROM producto p
      INNER JOIN categoria c ON p.id_categoria = c.id_categoria;
    `);

    const productos = result.rows.map((p) => {
      let imagenFinal = null;

      if (p.imagen_producto) {
        const valor = p.imagen_producto.toString();

        // Si empieza con "http", asumimos que ya es una URL válida
        if (valor.startsWith("http")) {
          imagenFinal = valor;
        } else {
          // Si realmente es binario, convertir a base64
          const base64 = p.imagen_producto.toString("base64");
          imagenFinal = `data:image/png;base64,${base64}`;
        }
      }

      return {
        ...p,
        imagen_producto: imagenFinal,
      };
    });

    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
productoRouter.get("/:codigo_producto", async (req, res) => {
  const { codigo_producto } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        p.codigo_producto,
        c.nombre_categoria,
        c.id_categoria,        
        p.nombre_producto,
        p.decripcion_producto,
        p.precio_producto,
        p.imagen_producto,
        p.imagen_producto
      FROM producto p
      INNER JOIN categoria c ON p.id_categoria = c.id_categoria
      WHERE p.codigo_producto = $1;
      `,
      [codigo_producto]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const producto = result.rows[0];

    // Detectar si imagen_producto viene como Buffer (bytea)
    let imagen;
    if (producto.imagen_producto instanceof Buffer) {
      // Convertir a base64 con prefijo data
      imagen = `data:image/png;base64,${producto.imagen_producto.toString("base64")}`;
    } else if (producto.imagen_url) {
      // Si existe un campo imagen_url, usarlo
      imagen = producto.imagen_url;
    } else {
      // fallback
      imagen = null;
    }

    // Enviar el producto con el campo listo para el frontend
    res.json({
      ...producto,
      imagen_producto: imagen
    });

  } catch (err) {
    console.error("Error al obtener producto:", err);
    res.status(500).json({ error: err.message });
  }
});



// Actualizar producto por código
productoRouter.put("/:codigo_producto", async (req, res) => {
  const { codigo_producto } = req.params;
  const {
    nombre_producto,
    decripcion_producto,
    precio_producto,
    imagen_producto,
    id_categoria
  } = req.body;

  try {
    // Verificar si el producto existe
    const existe = await pool.query(
      "SELECT * FROM producto WHERE codigo_producto = $1",
      [codigo_producto]
    );

    if (existe.rows.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    // Actualizar los datos
    const result = await pool.query(
      `
      UPDATE producto
      SET
        nombre_producto = $1,
        decripcion_producto = $2,
        precio_producto = $3,
        imagen_producto = $4,
        id_categoria = $5
      WHERE codigo_producto = $6
      RETURNING *;
      `,
      [
        nombre_producto,
        decripcion_producto,
        precio_producto,
        imagen_producto,
        id_categoria,
        codigo_producto
      ]
    );

    res.json({
      message: "Producto actualizado correctamente",
      producto: result.rows[0],
    });
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).json({ error: err.message });
  }
});


// borrar categoria 
productoRouter.delete("/borrar-producto/:codigo_producto", async (req, res) => {
  const { codigo_producto } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM producto WHERE codigo_producto = $1 RETURNING *",
      [codigo_producto]
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