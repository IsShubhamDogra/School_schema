const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();

// CORS configuration to allow requests from 'http://localhost:4200'
app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:4201']
}));

const port = 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Connection
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

// Ensure 'uploads' directory exists
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/'); // Destination folder for uploaded files
  },
  filename: (_req, file, cb) => {
    // Custom filename: fieldname-<timestamp>.<file-extension>
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image'); // Ensure 'image' is the field name from the form

app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(500).json({ error: err.message });
    } else if (err) {
      // An unknown error occurred when uploading.
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const name = req.body.name;
    const message = req.body.message;
    const image = req.file.filename; // Store filename instead of buffer

    const sql = 'INSERT INTO uploads (name, message, image) VALUES (?, ?, ?)';
    db.query(sql, [name, message, image], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      res.json({ message: 'Image uploaded successfully', id: results.insertId });
    });
  });
});

// Fetch Images (example)
app.get('/images', (req, res) => {
  const sql = 'SELECT id, name, message, image FROM uploads';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    }
    const images = results.map(row => ({
      id: row.id,
      name: row.name,
      message: row.message,
      image: `http://localhost:${port}/uploads/${row.image}`
    }));
    res.json(images);
  });
});

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// Update Image Details
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM uploads WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Error deleting data' });
    }
    res.json({ message: 'Image deleted successfully' });
  });
});