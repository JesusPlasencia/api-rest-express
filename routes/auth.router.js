const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthService = require('../services/auth.service');
const service = new AuthService();

const validatorHandler = require('../middlewares/validator.handler');
const { newPasswordSchema } = require('../schemas/auth.schema');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      res.json(service.signToken(user));
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/recovery',
  // passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await service.sendRecovery(email);
      res.status(200).json(rta);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  '/change-password',
  validatorHandler(newPasswordSchema, 'body'),
  // passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await service.changePassword(token, newPassword);
      res.status(200).json(rta);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
