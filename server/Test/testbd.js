import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false }});

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Query OK. Hora en BD:', res.rows[0]);
  } catch (err) {
    console.error('Error en query:', err.message);
  } finally {
    await pool.end();
  }
})();


// Ejecuta con: node server\Test\testbd.js