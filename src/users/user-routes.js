const express = require('express');
const {
  register,
  login,
  scanResult,
} = require('./user-controllers');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/results', scanResult);

module.exports = router;
