const express = require('express');
const CategoryService = require('../services/category.service');

const router = express.Router();

const service = new CategoryService();

router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
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
