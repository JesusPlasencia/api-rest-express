const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hi, this is my server in Express');
});

app.get('/home', (req, res) => {
  res.send('<h1>Hello, World</h1>');
});

app.get('/new-route', (req, res) => {
  res.send('Hi, this is a new endpoint.');
});

app.get('/products', (req, res) => {
  res.json({
    name: 'Hi, this is the page of the products.',
    price: 1000,
  });
});

app.get('/categories', (req, res) => {
  res.json([
    {
      id: 'C00001',
      name: 'Television',
    },
    {
      id: 'C00002',
      name: 'Videogames',
    },
    {
      id: 'C00003',
      name: 'Laptops',
    },
  ]);
});

app.listen(PORT, () => {
  console.log('Listening on Port: ' + PORT);
});
