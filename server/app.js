// server/app.js
import express from "express";
import cors from "cors";
import usuarioRouter from "./routes/usuario.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/usuario", usuarioRouter);

// Ruta de prueba (para chequear si el server responde)
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// Puerto
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
