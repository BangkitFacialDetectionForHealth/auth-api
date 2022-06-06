const pool = require('../../config/database');

module.exports = {
  createUser: (data, callBack) => {
    pool.query(
      `insert into tb_users(username, email, password)
              values(?, ?, ?)`,
      [
        data.username,
        data.email,
        data.password,
      ],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      },
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from tb_users where email = ?
      `,
      [email],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },
};
