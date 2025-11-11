import express from "express";
import cors from "cors";  
import 'dotenv/config';
//rutas
import usuarioRouter from "./routes/usuario.routes.js";
import categoriaRouter from "./routes/categoria.routes.js";
import productoRouter from "./routes/producto.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import blogRouter from "./routes/blog.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
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

// URL_API_1 = "http://localhost:5173";
// URL_API_2 = "http://localhost:5174";


app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
app.use(express.json());
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocs));
app.use("/api/usuario", usuarioRouter);
app.use("/api/categorias", categoriaRouter);
app.use("/api/productos", productoRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/estadisticas", dashboardRouter);
app.use("/api/ventas", ventaRoutes);

app.get("/health", (_req, res) => res.json({ ok: true }));


  // Iniciar el servidor Configurar el puerto y a la BD
  const PORT = process.env.PORT || 5174;
  app.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
  });
