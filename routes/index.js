const express = require('express');
const authRouter = require('./auth.router');
const productsRouter = require('./product.router');
const usersRouter = require('./user.router');
const categoriesRouter = require('./category.router');
const customersRouter = require('./customer.router');
const ordersRouter = require('./order.router');
const itemsRouter = require('./order-product.router');
const profileRouter = require('./profile.router');

function routerAPI(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/products', productsRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
  router.use('/items', itemsRouter);
  router.use('/profile', profileRouter);
}

module.exports = routerAPI;
