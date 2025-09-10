import pg from 'pg';
const { Pool } = pg;

// ⚠️ IMPORTANTE: NO pongas la URI directo aquí, guárdala en un archivo .env
// Ejemplo en tu .env:
// DATABASE_URL=postgresql://usuario:password@aws-1-sa-east-1.pooler.supabase.com:6543/postgres

DATABASE_URL='postgresql://postgres.favyjewyfjotapexlbwt:j@VEpwUJ)anT?)b1i)RPXp%!2kspp>@aws-1-sa-east-1.pooler.supabase.com:6543/postgres'

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
