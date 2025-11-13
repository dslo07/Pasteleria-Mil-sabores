import { Router } from "express";
import pool from "../bd.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const productoRouter = Router();

// ====================== //
//  Middleware de autenticación
// ====================== //
const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: "Acceso denegado. Falta token." });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guarda los datos del usuario (id y rol)
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
};

// Middleware para verificar que el usuario sea admin
const soloAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    return res.status(403).json({ error: "Acceso denegado. Solo admins." });
  }
  next();
};

//  Validación de datos
const validarDatosProducto = (producto) => {
  const {
    codigo_producto,
    id_categoria,
    nombre_producto,
    decripcion_producto,
    precio_producto,
    imagen_producto,
  } = producto;

  return (
    codigo_producto &&
    id_categoria &&
    nombre_producto &&
    decripcion_producto &&
    precio_producto &&
    imagen_producto
  );
};

//  Crear producto (solo admin)
productoRouter.post(
  "/crear-producto",
  verificarToken,
  soloAdmin,
  async (req, res) => {
    const {
      codigo_producto,
      id_categoria,
      nombre_producto,
      decripcion_producto,
      precio_producto,
      imagen_producto,
    } = req.body;

    if (!validarDatosProducto(req.body)) {
      return res.status(400).json({ error: "No puede enviar datos vacíos" });
    }

    try {
      const result = await pool.query(
        "INSERT INTO producto (codigo_producto,id_categoria,nombre_producto,decripcion_producto,precio_producto,imagen_producto) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
        [
          codigo_producto,
          id_categoria,
          nombre_producto,
          decripcion_producto,
          precio_producto,
          imagen_producto,
        ]
      );
      res.status(201).json({ msg: "Producto creado", producto: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

//  Obtener todos los productos (público)
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
        if (valor.startsWith("http")) {
          imagenFinal = valor;
        } else {
          const base64 = p.imagen_producto.toString("base64");
          imagenFinal = `data:image/png;base64,${base64}`;
        }
      }
      return { ...p, imagen_producto: imagenFinal };
    });

    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//  Obtener producto por código (público)
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
    let imagen;

    if (producto.imagen_producto instanceof Buffer) {
      imagen = `data:image/png;base64,${producto.imagen_producto.toString("base64")}`;
    } else {
      imagen = producto.imagen_producto || null;
    }

    res.json({ ...producto, imagen_producto: imagen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar producto (solo admin)
productoRouter.put(
  "/:codigo_producto",
  verificarToken,
  soloAdmin,
  async (req, res) => {
    const { codigo_producto } = req.params;
    const {
      nombre_producto,
      decripcion_producto,
      precio_producto,
      imagen_producto,
      id_categoria,
    } = req.body;

    try {
      const existe = await pool.query(
        "SELECT * FROM producto WHERE codigo_producto = $1",
        [codigo_producto]
      );

      if (existe.rows.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }

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
          codigo_producto,
        ]
      );

      res.json({
        message: "Producto actualizado correctamente",
        producto: result.rows[0],
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

//  Eliminar producto (solo admin)
productoRouter.delete(
  "/borrar-producto/:codigo_producto",
  verificarToken,
  soloAdmin,
  async (req, res) => {
    const { codigo_producto } = req.params;
    try {
      const result = await pool.query(
        "DELETE FROM producto WHERE codigo_producto = $1 RETURNING *",
        [codigo_producto]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ msg: "Producto eliminado", producto: result.rows[0] });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default productoRouter;
