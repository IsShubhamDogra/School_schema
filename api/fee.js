const express = require('express');
const router = express.Router();
const { db } = require('./db'); 


router.post('/fee', (req, res) => {
  const { session, classes, stream, fee, uniform, tour } = req.body;

  if (!session || !classes || !fee || !uniform || !tour) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = 'INSERT INTO fee_structure (session, classes, stream, fee, uniform, tour) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [session, classes, stream, fee, uniform, tour], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Error uploading fee_structure metadata' });
    }
    res.json({ message: 'fee_structure saved successfully' });
  });
});


// Express.js route

router.get('/fee', (req, res) => {
    const { classes, stream } = req.query;
  
    if (!classes) {
      return res.status(400).json({ error: 'Class parameter is required' });
    }
  
    let sql = 'SELECT * FROM fee_structure WHERE classes = ?';
    const params = [classes];
  
    if (stream) {
      sql += ' AND stream = ?';
      params.push(stream);
    }
  
    db.query(sql, params, (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Error retrieving fee_structure data' });
      }
      res.json(results);
    });
  });
  

module.exports = router;
