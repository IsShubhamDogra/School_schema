const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;


let items = [];
let id = 1;

routes.get('/api/items', (req, res) => {
  res.json(items);
});

routes.post('/api/items', (req, res) => {
  const newItem = {
    id: id++,
    date:req.body.date,
    title: req.body.title,
    message: req.body.message
  };
  items.push(newItem);
  res.json({ message: 'Item created', item: newItem });
});

routes.delete('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter(item => item.id !== itemId);
  res.json({ message: 'Item deleted' });
});
