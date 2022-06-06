const { genSaltSync, hashSync } = require('bcrypt');
const { create } = require('./user-service');

module.exports = {
  createUser: (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (error, results) => {
      if (error) {
        console.log(error);
        return res.code(500).json({
          status: 'fail',
          message: 'Database connection error',
        });
      }
      return res.code(200).json({
        status: 'success',
        message: 'Database connected',
        data: results,
      });
    });
  },
};
