const express = require('express');
const {
  register,
  login,
  scanResult,
  viewProfile,
} = require('./user-controllers');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/results', scanResult);
router.post('/my-profile', viewProfile);

module.exports = router;
