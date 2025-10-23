import express from "express";
import cors from "cors";  
//rutas
import usuarioRouter from "./routes/usuario.routes.js";
import categoriaRouter from "./routes/categoria.routes.js";
import productoRouter from "./routes/producto.routes.js";
import blogRouter from "./routes/blog.routes.js";
import 'dotenv/config';

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/usuario", usuarioRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/productos", productoRouter);
app.use("/api/blogs", blogRouter);


app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});
