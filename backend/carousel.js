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

const port = 3002;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'school_schema'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

const uploadDir = 'carousel/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, 'carousel/'); // Destination folder for uploaded files
    },
    filename: (_req, file, cb) => {
      // Custom filename: fieldname-<timestamp>.<file-extension>
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage }).single('image');


  app.post('/uploadcarousel',  (req, res) => {
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
  
    const image = req.file.filename;
  
    const sql = "INSERT INTO images (image) VALUES (?)";
    db.query(sql, [image], (err, result) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: err.message });
      }
      res.status(200).json({ status: 'success', message: 'Image uploaded successfully', id: result.insertId });
    });
  });
});
app.get('/images', (req, res) => {
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

app.use('/carousel', express.static(path.join(__dirname, 'carousel')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// Update Image Details
app.delete('/delete/:id',(req, res) => {
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

//pdf upload for announcement

app.post('/uploadpdf', (req, res) => {
  const file = req.file;
  const filePath = path.join(__dirname, 'carousel', file.filename);

  fs.readFile(filePath, (err, fileData) => {
    if (err) throw err;

    const sql = 'INSERT INTO pdf_files (file_name, file_data, message) VALUES (?, ?, ?)';
    db.query(sql, [file.originalname, fileData], (err, result) => {
      if (err) throw err;
      fs.unlink(filePath, err => {
        if (err) throw err;
        res.status(201).json({ message: 'File uploaded successfully', fileId: result.insertId });
      });
    });
  });
});

app.get('/fetch-pdf/:id', (req, res) => {
  const pdfId = req.params.id;

  const sql = 'SELECT file_name, file_data FROM pdf_files WHERE id = ?';
  db.query(sql, [pdfId], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    const pdf = result[0];
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${pdf.file_name}`);
    res.send(pdf.file_data);
  });
});



