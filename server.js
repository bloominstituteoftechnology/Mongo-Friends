const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogRoutes.js');
const friendsRouter = require('./routes/friendRoutes.js');

const server = express();

server.use(bodyParser.json());

server.use('/api/friends', friendsRouter);
server.use('/api/blog', blogRouter);

server.get('/', function(req, res) {
    res.status(200).json({ status: 'API Running' });
});

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
