const express = require('express');
const {
  createUser,
  getUsers,
  getUserById,
} = require('./user-controller');

const router = express.Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/login', );

module.exports = router;
