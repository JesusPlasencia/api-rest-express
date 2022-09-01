const express = require('express');
const passport = require('passport');

const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();

const service = new CustomerService();

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
  validatorHandler(getCustomerSchema, 'params'),
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
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
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
  validatorHandler(getCustomerSchema, 'params'),
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
