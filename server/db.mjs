import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'event_admin',
  host: 'localhost',
  database: 'event_platform',
  password: 'your_password',
  port: 5432,
});

export default pool;
