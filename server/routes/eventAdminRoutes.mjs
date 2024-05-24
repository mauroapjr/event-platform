import express from 'express';
import pool from '../db.mjs';

const router = express.Router();

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3',
      [username, password, 'event_admin']
    );
    const user = result.rows[0];
    if (user) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get Events
router.get('/get-events', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create Event
router.post('/create-event', async (req, res) => {
  const { name, date, location, created_by } = req.body;
  try {
    const newEvent = await pool.query(
      'INSERT INTO events (name, date, location, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, date, location, created_by]
    );
    res.status(201).json(newEvent.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit Event
router.put('/edit-event/:id', async (req, res) => {
  const { id } = req.params;
  const { name, date, location } = req.body;
  try {
    const updatedEvent = await pool.query(
      'UPDATE events SET name = $1, date = $2, location = $3 WHERE id = $4 RETURNING *',
      [name, date, location, id]
    );
    res.status(200).json(updatedEvent.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete Event
router.delete('/delete-event/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM events WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get Competitors for a Specific Event
router.get('/get-competitors/:eventId', async (req, res) => {
  const { eventId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM competitors WHERE event_id = $1', [eventId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching competitors:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Competitor
// router.post('/add-competitor', async (req, res) => {
//   const { name, event_id } = req.body;
//   try {
//     const newCompetitor = await pool.query(
//       'INSERT INTO competitors (name, event_id) VALUES ($1, $2) RETURNING *',
//       [name, event_id]
//     );
//     res.status(201).json(newCompetitor.rows[0]);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

router.post('/add-competitor', async (req, res) => {
  const { name, event_id, category, sub_category } = req.body;

  try {
    const newCompetitor = await pool.query(
      'INSERT INTO competitors (name, event_id, category, sub_category) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, event_id, category, sub_category]
    );
    res.status(201).json(newCompetitor.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit Competitor
router.put('/edit-competitor/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCompetitor = await pool.query(
      'UPDATE competitors SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );
    res.status(200).json(updatedCompetitor.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete Competitor
router.delete('/delete-competitor/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM competitors WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Fetch Judges for an Event
router.get('/get-judges/:eventId', async (req, res) => {
  const { eventId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM judges WHERE event_id = $1', [eventId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching judges:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add Judge to an Event
router.post('/add-judge', async (req, res) => {
  const { name, event_id } = req.body;

  try {
    const newJudge = await pool.query(
      'INSERT INTO judges (name, event_id) VALUES ($1, $2) RETURNING *',
      [name, event_id]
    );
    res.status(201).json(newJudge.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete Judge
router.delete('/delete-judge/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM judges WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
