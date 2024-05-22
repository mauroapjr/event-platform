import express from 'express';
import pool from '../db.mjs';

const router = express.Router();

// Admin login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2 AND role = $3',
      [username, password, 'website_admin']
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

// Get all admins
router.get('/get-admins', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username FROM users WHERE role = $1', ['website_admin']);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error getting admins:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new admin
router.post('/create-admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
      [username, password, 'website_admin']
    );
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete an admin
router.delete('/delete-admin/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM users WHERE id = $1 AND role = $2', [id, 'website_admin']);
    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;


