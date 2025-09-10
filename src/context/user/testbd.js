import pool from 'src/context/user/bd.js';

(async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Hora en BD:', res.rows[0]);
  } catch (err) {
    console.error('❌ Error en query:', err.message);
  } finally {
    pool.end(); // cerrar pool
  }
})();
