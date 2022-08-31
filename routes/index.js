const express = require('express');
const productsRouter = require('./product.router');
const usersRouter = require('./user.router');
const categoriesRouter = require('./category.router');
const customersRouter = require('./customer.router');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerAPI;
