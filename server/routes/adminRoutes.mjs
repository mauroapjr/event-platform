import express from 'express';
import pool from '../db.mjs';

const router = express.Router();

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3', [username, password, 'admin']);
    if (user.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: user.rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create event
router.post('/create-event', async (req, res) => {
  const { name, date, location, created_by } = req.body;
  try {
    const newEvent = await pool.query('INSERT INTO events (name, date, location, created_by) VALUES ($1, $2, $3, $4) RETURNING *', [name, date, location, created_by]);
    res.status(201).json(newEvent.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit event
router.put('/edit-event/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location } = req.body;
  try {
    const updatedEvent = await pool.query('UPDATE events SET name = $1, date = $2, location = $3 WHERE id = $4 RETURNING *', [name, date, location, id]);
    res.status(200).json(updatedEvent.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete event
router.delete('/delete-event/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add competitor
router.post('/add-competitor', async (req, res) => {
  const { name, event_id } = req.body;
  try {
    const newCompetitor = await pool.query('INSERT INTO competitors (name, event_id) VALUES ($1, $2) RETURNING *', [name, event_id]);
    res.status(201).json(newCompetitor.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit competitor
router.put('/edit-competitor/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCompetitor = await pool.query('UPDATE competitors SET name = $1 WHERE id = $2 RETURNING *', [name, id]);
    res.status(200).json(updatedCompetitor.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete competitor
router.delete('/delete-competitor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM competitors WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
