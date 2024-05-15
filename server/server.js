import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg'; 
import axios from 'axios';

const { Pool } = pg; 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const getAllEvents = async () => {
  const res = await pool.query('SELECT * FROM events');
  return res.rows;
};

const fetchEvents = async () => {
  const response = await axios.get('http://localhost:3000/events');
  console.log(response.data);
};