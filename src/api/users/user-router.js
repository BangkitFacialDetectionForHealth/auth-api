const express = require('express');
const {
  createUser,
  login,
} = require('./user-controller');
// const { checkToken } = require('../../auth/token-validation');

const router = express.Router();

router.post('/register', createUser);
router.post('/login', login);

module.exports = router;
