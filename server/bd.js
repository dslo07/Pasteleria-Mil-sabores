import pg from "pg";
import "dotenv/config"; // carga automáticamente el .env

const { Pool } = pg;

// Crear el pool de conexiones
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// Test rápido de conexión al iniciar
(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexión a PostgreSQL exitosa:", res.rows[0].now);
  } catch (err) {
    console.error(" Error al conectar a PostgreSQL:", err.message);
  }
})();

export default pool;
