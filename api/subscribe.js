const express = require('express');
const router = express.Router();
const { db } = require('./db'); 

router.post('/subscribe', (req, res) => {
    const { email } = req.body;
    const checkEmailSql = "SELECT * FROM subscribers WHERE email = ?";
    const checkEmailValues = [email];
    
    db.query(checkEmailSql, checkEmailValues, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Database error', error: err });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already subscribed' });
        } else {
            const insertSql = "INSERT INTO subscribers (email) VALUES (?)";
            const insertValues = [email];
            db.query(insertSql, insertValues, (err, result) => {
                if (err) {
                    console.error('Database error:', err);
                    return res.status(500).json({ message: 'Database error', error: err });
                }
                res.status(200).json({ message: 'Subscribe Successful', userId: result.insertId });
            });
        }
    });
});

router.post('/query',(req,res)=>{
    const email = req.body.email;
    const subject = req.body.subject;
    const query = req.body.query;
    const sql = 'INSERT INTO query_table (email, subject, query) VALUES (?, ?, ?)';
    db.query(sql, [email, subject, query], (err, results) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ error: 'Error inserting data' });
      }
      res.json({ message: 'Query uploaded successfully', id: results.insertId });
    });
})


  module.exports = router;
  
