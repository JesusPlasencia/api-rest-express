const express = require('express');
const ProductsService = require('../services/product');
const router = express.Router();

const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send("I'm a filter");
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  if (body.name && body.price) {
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  } else {
    res.status(406).json({
      message: 'Wrong!',
    });
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
