import express from "express";
import cors from "cors";
import usuarioRouter from "./routes/usuario.routes.js";
import 'dotenv/config';

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api/usuario", usuarioRouter);

app.get("/health", (_req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en http://localhost:${PORT}`);
});
