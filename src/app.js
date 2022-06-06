require('dotenv').config();
const express = require('express');
const usersRouter = require('../api/users/user-router');

const app = express();

app.use('/api/users', usersRouter);

app.listen(process.env.APP_PORT, process.env.DB_HOST, () => {
  console.log('Server is running on PORT : ', process.env.APP_PORT);
});
