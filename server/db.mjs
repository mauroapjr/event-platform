// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'event_platform',
//   password: 'password',
//   port: 5432,
// });

// export default pool;

// import pkg from 'pg';
// const { Pool } = pkg;

// const pool = new Pool({
//   user: 'diogo_developer',
//   host: 'dbeventplatform.cjqu32oisej5.us-east-1.rds.amazonaws.com',
//   database: 'dbEventPlatform',
//   password: 'password123',
//   port: 5432,
//   ssl: {
//     rejectUnauthorized: false
//   },
// });

// export default pool;

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "diogo_developer",
  host: "dbeventplatform.cjqu32oisej5.us-east-1.rds.amazonaws.com",
  database: "dbEventPlatform",
  password: "password123",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    const res = await pool.query("SELECT current_user;");
    console.log("Current DB user:", res.rows[0]);
  } catch (err) {
    console.error("Error fetching current user:", err);
  }
})();

export default pool;
