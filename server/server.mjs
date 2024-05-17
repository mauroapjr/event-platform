// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import pg from 'pg'; 
// import axios from 'axios';

// const pool = require('./db');
// const judgeRoutes = require('./routes/judgeRoutes');
// const adminRoutes = require('./routes/adminRoutes');
// //const { Pool } = pg; 
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(cors());

// app.use('/judge', judgeRoutes);
// app.use('/admin', adminRoutes);

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// const getAllEvents = async () => {
//   const res = await pool.query('SELECT * FROM events');
//   return res.rows;
// };

// const fetchEvents = async () => {
//   const response = await axios.get('http://localhost:3000/events');
//   console.log(response.data);
// };

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

import pool from './db.mjs';
import judgeRoutes from './routes/judgeRoutes.mjs';
import adminRoutes from './routes/eventAdminRoutes.mjs';

const app = express();
const PORT = process.env.PORT || 3000;  // Use a different port to avoid conflict with client

app.use(bodyParser.json());
app.use(cors());

app.use('/judge', judgeRoutes);
app.use('/admin', adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Example function to get all events
const getAllEvents = async () => {
  const res = await pool.query('SELECT * FROM events');
  return res.rows;
};

// Example function to fetch events
const fetchEvents = async () => {
  const response = await axios.get('http://localhost:5000/events');
  console.log(response.data);
};

// Export the functions for use in other parts of your application
export default { getAllEvents, fetchEvents };

