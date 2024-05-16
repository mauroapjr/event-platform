import express from 'express';
import pool from '../db.mjs';

const router = express.Router();

// Judge login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3', [username, password, 'judge']);
    if (user.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: user.rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add score
router.post('/add-score', async (req, res) => {
  const { judge_id, heat_id, competitor_id, score } = req.body;
  try {
    const newScore = await pool.query('INSERT INTO scores (judge_id, heat_id, competitor_id, score) VALUES ($1, $2, $3, $4) RETURNING *', [judge_id, heat_id, competitor_id, score]);
    res.status(201).json(newScore.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Edit score
router.put('/edit-score/:id', async (req, res) => {
  const { id } = req.params;
  const { score } = req.body;
  try {
    const updatedScore = await pool.query('UPDATE scores SET score = $1 WHERE id = $2 RETURNING *', [score, id]);
    res.status(200).json(updatedScore.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete score
router.delete('/delete-score/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM scores WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

export default router;
