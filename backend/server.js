const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
// const ptmrouter = require('./ptm')

const jwt = require('jsonwebtoken');

const app = express();

// CORS configuration to allow requests from 'http://localhost:4200'
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201']
}));

const port = 3000;
// app.use('/',ptmrouter);


// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your MySQL password
  database: 'school_schema'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL Database.');
});

// Body parser middleware for handling JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', (req, res) => {
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
app.get('/users', (req, res) => {
  const sql = "SELECT * FROM users";
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    
    res.status(200).json(results);
  });
});
// Endpoint to fetch the count of users
app.get('/user-count', (req, res) => {
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
// login logic
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.status(404).json({ err});

    }

    const user = results[0];
    const isMatch = (password === user.password);
    if (!isMatch) {
      return res.status(401).json({ err});


    }

    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
