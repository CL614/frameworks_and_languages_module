const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Mock data storage
const items = [];

// Root endpoint
app.get('/', (req, res) => {
  res.send('<html><body>Your HTML text</body></html>');
});

app.options('/', (req, res) => {
  res.status(204).set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE',
  }).end();
});

// Item endpoints
app.post('/item/', (req, res) => {
  const newItem = req.body;
  items.push(newItem);

  res.status(201).json(newItem);
});

app.get('/item/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const foundItem = items.find(item => item.id === itemId);

  if (!foundItem) {
    return res.status(404).json({ error: 'Item not found' });
  }

  res.json(foundItem);
});

app.delete('/item/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const index = items.findIndex(item => item.id === itemId);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  items.splice(index, 1);
  res.status(204).end();
});

app.get('/items/', (req, res) => {
  // Implementation to filter items based on query parameters
  // You may need to parse and validate the query parameters

  const filteredItems = items.filter(item => {
    // Implement filtering logic based on query parameters
    return true;
  });

  res.json(filteredItems);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});





