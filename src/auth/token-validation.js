const { verify } = require('jsonwebtoken');

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get('authorization');

    if (token) {
      token = token.slice(6);
      verify(token, process.env.TOKEN_KEY, (error) => {
        if (error) {
          res.status(400).json({
            status: 'fail',
            message: 'Invalid token',
          });
        }
        return next();
      });
    }
    return res.status(401).json({
      status: 'fail',
      message: 'Access denied',
    });
  },
};
