const express = require('express');
const path = require('path');
const cors = require('cors');
const { port } = require('./db');
const carousel = require('./carousel');
const message = require('./message');
const pdfs = require('./pdf')
const authserver = require('./authserver');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    origin: ['http://localhost:4200', 'http://localhost:4201']
  }));
  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', carousel);
app.use('/',message);
app.use('/',authserver);
app.use('/',pdfs)

// Serve static files from the carousel directory
app.use('/carousel', express.static(path.join(__dirname, 'carousel')));

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});