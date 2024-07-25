const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db, port } = require('./db'); 
const fs = require('fs');

// Ensure upload directory exists
const uploadDir = 'carousel/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'carousel'); // Destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      // Custom filename: fieldname-<timestamp>.<file-extension>
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

//   const upload = multer({ dest: 'carousel/' });
const upload = multer({ storage: storage });

router.post('/uploadcarousel', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const image = req.file.filename;

  const sql = "INSERT INTO images (image) VALUES (?)";
  db.query(sql, [image], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    res.status(200).json({ status: 'success', message: 'Image uploaded successfully', id: result.insertId });
  });
});

router.get('/images', (req, res) => {
  const sql = "SELECT id, image FROM images";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: err.message });
    }
    const images = results.map(row => ({
      id: row.id,
      image: `http://localhost:${port}/carousel/${row.image}`
    }));
    res.json(images);
  });
});

router.delete('/delete/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM images WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Error deleting data' });
    }
    res.json({ message: 'Image deleted successfully' });
  });
});

module.exports = router;
