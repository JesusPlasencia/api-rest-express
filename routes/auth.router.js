const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = await req.user;
      const payload = {
        id: user.id,
        role: user.role,
      };
      const token = await jwt.sign(payload, config.apiSecret);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
