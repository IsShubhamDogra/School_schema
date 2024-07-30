const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { db, port } = require('./db'); 
const fs = require('fs');

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

//   const upload = multer({ dest: 'carousel/' });
const upload = multer({ storage: storage });

// Route for uploading general images
router.post('/upload', (req, res) => {
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const name = req.body.name;
      const message = req.body.message;
      const image = req.file.filename;
  
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
   // Fetch images
   router.get('/dmsg', (req, res) => {
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
  router.delete('/delete/:id', (req, res) => {
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
  
  
  // principal messages
  router.post('/uploadpmsg', (req, res) => {
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const name = req.body.name;
      const message = req.body.message;
      const image = req.file.filename;
  
      const sql = 'INSERT INTO pmsg (name, message, image) VALUES (?, ?, ?)';
      db.query(sql, [name, message, image], (err, results) => {
        if (err) {
          console.error('Error inserting data:', err);
          return res.status(500).json({ error: 'Error inserting data' });
        }
        res.json({ message: 'Image uploaded successfully', id: results.insertId });
      });
    });
  });
  
  router.get('/pmsget', (req, res) => {
    const sql = 'SELECT id, name, message, image FROM pmsg';
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
  
  router.delete('/deletepmsg/:id', (req, res) => {
    const id = req.params.id;
  
    const sql = 'DELETE FROM pmsg WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Error deleting data' });
      }
      res.json({ message: 'Image deleted successfully' });
    });
  });

  //school message


router.post('/school_m', (req, res) => {
  const { title,message } = req.body;

  const sql = 'INSERT INTO school_msg (title, message) VALUES (?, ?)';
  db.query(sql, [title,message], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error uploading School Message' });
    }
    res.json({ message: 'School Message saved successfully' });
  });
});

router.get('/s_msg', (req, res) => {
  const sql = 'SELECT id, title, message FROM school_msg';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    }
    const msg = results.map(row => ({
      id: row.id,
      title: row.title,
      message: row.message
    }));
    res.json(msg);
  });
});

router.delete('/deleteSmsg/:id', (req, res) => {
  const id = req.params.id;

  const sql = 'DELETE FROM school_msg WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting data:', err);
      return res.status(500).json({ error: 'Error deleting data' });
    }
    res.json({ message: 'Message deleted successfully' });
  });
});


  
  module.exports = router;