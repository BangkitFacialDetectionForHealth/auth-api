require('dotenv').config();
const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'This API is working!',
  });
});

app.listen(process.env.APP_PORT, process.env.DB_HOST, () => {
  console.log('Server is running on PORT : ', process.env.APP_PORT);
});
