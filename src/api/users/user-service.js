const pool = require('../../config/database');

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into tb_users(username, email, password)
                  values(?,?,?)`,
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
};
