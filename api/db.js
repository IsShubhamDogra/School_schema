const mysql = require('mysql');

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

  const port = 8000;

module.exports = { db, port };
  