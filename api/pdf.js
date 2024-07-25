const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
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

// POST route for uploading PDF and text
// router.post('/pdfupload', upload.single('pdf'), (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }
//   const text = req.body.text;
//   const textFilePath = path.join('pdfs', `${req.file.filename}.txt`);
//   fs.writeFileSync(textFilePath, text);
//   res.send('File uploaded successfully.');
// });
router.post('/pdfupload', upload.single('pdf'), (req, res) => {
  
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    
    const filename = req.file.filename;
    const text = req.body.text || '';
  
    // Insert metadata into the database
    const query = 'INSERT INTO pdf_files (filename, text) VALUES (?, ?)';
    db.query(query, [filename, text], (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error saving file metadata.');
      }
      res.send('File uploaded and metadata saved successfully.');
    });
  });


router.get('/pdf', (req, res) => {
    const query = 'SELECT id, filename,text FROM pdf_files';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).send('Error retrieving PDF metadata.');
      }
      res.json(results);
    });
  });
  
  // GET route for fetching PDF by ID
  router.get('/pdf/:id', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT filename FROM pdf_files WHERE id = ?';
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
  router.delete('/deletepdf/:id', (req, res) => {
    const id = req.params.id;
  
    const sql = 'DELETE FROM pdf_files WHERE id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error('Error deleting data:', err);
        return res.status(500).json({ error: 'Error deleting data' });
      }
      res.json({ message: 'pdf deleted successfully' });
    });
  });
  

module.exports = router;
