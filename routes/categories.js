const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      id: 'C001',
      name: 'Clothes',
    },
    {
      id: 'C002',
      name: 'Gamers',
    },
    {
      id: 'C003',
      name: 'Music',
    },
  ]);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Any Category',
  });
});

router.get('/:idCategory/products/:idProduct', (req, res) => {
  const { idCategory, idProduct } = req.params;
  res.json({
    idProduct,
    name: 'Television',
    idCategory,
  });
});

module.exports = router;
