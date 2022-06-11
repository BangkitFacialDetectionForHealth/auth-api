require('dotenv').config();
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {
  createUser,
  getUserByEmail,
} = require('./user-services');

module.exports = {
  register: (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    createUser(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: 'fail',
          message: 'Database connection error',
        });
      }
      return res.status(201).json({
        status: 'success',
        message: 'User created',
        data: results,
      });
    });
  },
  login: (req, res) => {
    const { body } = req;

    getUserByEmail(body.email, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: 'fail',
          message: 'Internal server error',
        });
      }
      if (!results) {
        return res.status(400).json({
          status: 'fail',
          message: 'Invalid email or password',
        });
      }

      const result = compareSync(body.password, results.password);

      if (result) {
        // eslint-disable-next-line no-param-reassign
        results.password = undefined;
        const jsontoken = sign({ result: results }, process.env.TOKEN_KEY, {
          expiresIn: '1h',
        });
        return res.status(200).json({
          status: 'success',
          message: 'Login successfully',
          token: jsontoken,
        });
      }
      return res.status(400).json({
        status: 'fail',
        message: 'Invalid email or password',
      });
    });
  },
  detector: (req, res) => {
    const { body } = req;
    const myFace = body.PhotoUrl;

    // Image Detection Process
    //
    // Output
    if (myFace === 'acne-cystic') {
      //
    } else if (myFace === 'acne-excoriated') {
      //
    } else if (myFace === 'acne-open-comedo') {
      //
    } else if (myFace === 'acne-pustular') {
      //
    } else if (myFace === 'acne-scar') {
      //
    } else if (myFace === 'closed-comedo') {
      //
    } else if (myFace === 'milia') {
      //
    } else if (myFace === 'perioral-dermatitis') {
      //
    } else if (myFace === 'Rhinophyma') {
      //
    } else if (myFace === 'Rosacea') {
      //
    } else if (myFace === 'rosacea-nose') {
      //
    }
  },
};
