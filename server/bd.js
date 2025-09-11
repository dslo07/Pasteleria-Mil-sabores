// server/bd.js
import 'dotenv/config';     
import pg from 'pg';
const { Pool } = pg;

if (!process.env.DATABASE_URL) { 
  console.error('DATABASE_URL no está definido. Revisa tu .env');
  process.exit(1);
}

let pool;
try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  pool.connect()
    .then(c => { console.log('Conexión exitosa a PostgreSQL'); c.release(); })
    .catch(err => { console.error('Error al conectar a PostgreSQL:', err.message); });

} catch (error) {
  console.error('Error creando el pool de conexiones:', error.message);
}

export default pool;
