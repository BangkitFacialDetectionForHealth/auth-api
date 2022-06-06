const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
const {
  createUser,
  getUsers,
  getUserById,
  getUserByEmail,
} = require('./user-service');

module.exports = {
  createUser: (req, res) => {
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
        message: 'Database connected',
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: 'fail',
          message: 'Internal server error',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'Users found',
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const { id } = req.params;
    getUserById(id, (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: 'fail',
          message: 'Internal server error',
        });
      }
      if (!results) {
        return res.status(404).json({
          status: 'fail',
          message: 'User not found',
        });
      }
      return res.status(200).json({
        status: 'success',
        message: 'User found',
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
};
