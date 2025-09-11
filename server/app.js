import express from "express";
import cors from "cors";
import usuarioRouter from "./routes/usuario.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/usuario", usuarioRouter);

app.listen(5173, () => {
  console.log("🚀 API corriendo en http://localhost:5173");
});
