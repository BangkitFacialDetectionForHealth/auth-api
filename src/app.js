require('dotenv').config();
const express = require('express');
const usersRouter = require('./api/users/user-routes');

const app = express();

app.use(express.json());

app.use('/', usersRouter);

app.listen(process.env.APP_PORT, process.env.DB_HOST, () => {
  console.log('Server is running on PORT ', process.env.APP_PORT);
});
