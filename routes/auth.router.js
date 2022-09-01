const express = require('express');
const passport = require('passport');
const router = express.Router();

const AuthService = require('../services/auth.service');
const service = new AuthService();

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

module.exports = router;
