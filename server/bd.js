import pg from 'pg';
import { config } from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});


(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Conexión OK:', res.rows[0].now);
  } catch (err) {
    console.error('❌ Error al conectar:', err.message);
  }
})();
export default pool;
