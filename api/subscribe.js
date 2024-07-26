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


  module.exports = router;
  
