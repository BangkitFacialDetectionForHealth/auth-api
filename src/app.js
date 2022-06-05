const express = require('express');

const app = express();

app.get('/api', (req, res) => {
  res.json({
    status: 'success',
    message: 'This API is working!',
  });
});

app.listen(5000, () => {
  console.log('Server is running');
});
