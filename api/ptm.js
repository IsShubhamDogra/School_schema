const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const { db } = require('./db'); 

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'pdfs/');
  },
  filename: (_req, file, cb) => {
    // Custom filename: fieldname-<timestamp>.<file-extension>
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/ptmupload', upload.single('pdf'), (req, res) => {
  
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    const filename = req.file.filename;
    const text = req.body.text || '';
  
    const query = 'INSERT INTO ptm_files (filename, text) VALUES (?, ?)';
    db.query(query, [filename, text,], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error saving file metadata.');
      }
      res.send('File uploaded and metadata saved successfully.');
    });
  });

  router.get('/ptm', (req, res) => {
    const query = 'SELECT id, filename,text FROM ptm_files';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error retrieving PDF metadata.');
      }
      res.json(results);
    });
  });
  
  //get ptm schedule by id
  router.get('/ptm/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT filename FROM ptm_files WHERE id = ?';
    db.query(query, [id], (err, results) => {
      if (err || results.length === 0) {
        console.error('Database error:', err);
        return res.status(500).send('Error retrieving PDF.');
      }
      const filename = results[0].filename;
      const filePath = path.join(__dirname, 'pdfs', filename);
      res.sendFile(filePath);
    });
  });
  // delete pdf
  router.delete('/deleteptm/:id', (req, res) => {
    const id = req.params.id;
  
    const sql = 'DELETE FROM ptm_files WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Error deleting data' });
      }
      res.json({ message: 'pdf deleted successfully' });
    });
  });
  


  module.exports = router;