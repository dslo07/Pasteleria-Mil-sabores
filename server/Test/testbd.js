// server/testDb.js
import pool from '../bd.js';

(async () => {
  try {
    const res = await pool.query('SELECT NOW() AS ahora');
    console.log('Query OK. Hora en BD:', res.rows[0].ahora);
  } catch (err) {
    console.error('Error en query:', err.message);
  } finally {
    await pool.end();
  }
})();
