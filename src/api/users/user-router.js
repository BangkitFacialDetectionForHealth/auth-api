const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
  login,
} = require('./user-controller');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/login', login);

module.exports = router;
