import pg from 'pg';
import { config } from 'dotenv';
config();

const { Pool } = pg;

let pool;

try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // necesario para Supabase o Railway
    },
  });

  // Probar conexión al inicializar
  pool.connect()
    .then(client => {
      console.log('✅ Conexión exitosa a PostgreSQL');
      client.release();
    })
    .catch(err => {
      console.error('❌ Error al conectar a PostgreSQL:', err.message);
    });

} catch (error) {
  console.error('❌ Error creando el pool de conexiones:', error.message);
}

export default pool;
