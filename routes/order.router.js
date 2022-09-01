const express = require('express');
const passport = require('passport');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  //createOrderSchema,
  getOrderSchema,
  updateOrderSchema,
} = require('../schemas/order.schema');

const router = express.Router();

const service = new OrderService();

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const users = await service.find();
    res.json(users);
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = {
        userId: user.id,
      };
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json(rta);
    } catch (err) {
      next(err);
    }
  }
);
module.exports = router;
