const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const friendsRouter = require('./routes/friendRoutes.js');

const server = express();

server.use(bodyParser.json());

server.get('/', function(req, res) {
    res.status(200).json({ status: 'API Running' });
});

server.use('/api/friends', friendsRouter);

mongoose.connect('mongodb://localhost/store')
    .then(conn => {
      console.log('Successfully Connected to MongoDB');
    })
    .catch(err => {
      console.log('Database connection failed');
    }
  );

  const port = process.env.PORT || 5005;
  server.listen(port, () => {
  console.log(`API running on http://localhost:${port}.`);
});