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

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import pool from "./db.mjs";
import judgeRoutes from "./routes/judgeRoutes.mjs";
import adminRoutes from "./routes/eventAdminRoutes.mjs";
import websiteAdminRoutes from "./routes/websiteAdminRoutes.mjs";
import eventAdminRoutes from "./routes/eventAdminRoutes.mjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/judge", judgeRoutes);
app.use("/admin", adminRoutes);
app.use("/website-admin", websiteAdminRoutes);
app.use("/event-admin", eventAdminRoutes);

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Database connected successfully');
  release();
});300

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const getAllEvents = async () => {
  const res = await pool.query("SELECT * FROM events");
  return res.rows;
};

const fetchEvents = async () => {
  const response = await axios.get("http://localhost:5000/events");
  console.log(response.data);
};

export default { getAllEvents, fetchEvents };
