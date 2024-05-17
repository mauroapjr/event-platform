import express from 'express';
import pool from '../db.mjs';
import bcrypt from 'bcrypt';

const router = express.Router();

// Create Event Admin
router.post('/create-event-admin', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, 'event_admin']
    );
    res.status(201).json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete Event Admin
router.delete('/delete-event-admin/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE id = $1 AND role = $2', [id, 'event_admin']);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit Event Admin 
router.put('/edit-event-admin/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  try {
    const updateUser = await pool.query(
      `UPDATE users SET username = $1, password = COALESCE($2, password) WHERE id = $3 AND role = $4 RETURNING *`,
      [username, hashedPassword, id, 'event_admin']
    );
    res.status(200).json(updateUser.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
