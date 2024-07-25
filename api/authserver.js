const express = require('express');
const router = express.Router();
const { db } = require('./db'); 
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', (req, res) => {
  const { Fname, Lname, email, gender, Phone, password } = req.body;
  
  const sql = "INSERT INTO users (first_name, last_name, email, gender, phone, password) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [Fname, Lname, email, gender, Phone, password];
  
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json({ message: 'User registered successfully', userId: result.insertId });
  });
});

// Fetch all users
router.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    
    res.status(200).json(results);
  });
});

// Fetch the count of users
router.get('/user-count', (req, res) => {
  const sql = "SELECT COUNT(*) AS count FROM users";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    
    const count = results[0].count;
    res.status(200).json({ count });
  });
});

// Login logic
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = results[0];
    const isMatch = (password === user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;