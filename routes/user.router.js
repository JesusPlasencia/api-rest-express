const express = require('express');
const UserService = require('../services/user.service');

const router = express.Router();

const service = new UserService();

router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id,
    name: 'Any User',
  });
});

module.exports = router;
