import express from "express";
import cors from "cors";  
import 'dotenv/config';

//rutas de los endpoints
import usuarioRouter from "./routes/usuario.routes.js";
import categoriaRouter from "./routes/categoria.routes.js";
import productoRouter from "./routes/producto.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import blogRouter from "./routes/blog.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import webpay from "./routes/webpay.routes.js";

//documentacion con swagger
import swaggerUiExpress from "swagger-ui-express";
import fs from "fs";

let swaggerDocs = {};
try {
  swaggerDocs = JSON.parse(
    fs.readFileSync("./swagger.json", "utf-8")
  );
  console.log("Swagger cargado correctamente");
} catch (err) {
  console.error("Error cargando Swagger, la documentación no estará disponible:", err);
}

const app = express();
process.on("uncaughtException", (err) => {
  console.error("Error no capturado:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Rechazo no manejado:", reason);
});

// ===== Configurar CORS desde el .env =====
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map(origin => origin.trim())
  : ["http://localhost:5173"]; // valor por defecto si falta la variable

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // si usas cookies, headers o auth
  })
);
app.use(express.json());
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
app.use("/api/usuario", usuarioRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/productos", productoRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/estadisticas", dashboardRouter);
app.use("/api/ventas", ventaRoutes);
app.use("/api/webpay", webpay);

app.get("/health", (_req, res) => res.json({ ok: true }));

console.log("🌍 Orígenes CORS permitidos:", allowedOrigins);

  // Iniciar el servidor Configurar el puerto y a la BD
  const PORT = process.env.PORT || 5174;
  app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
  });
