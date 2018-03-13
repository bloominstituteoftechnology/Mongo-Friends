const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRouter = require('./products/productRoutes');

const server = express();

server.use(helmet());
server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ api: 'running...' });
});

mongoose
  .connect('mongodb://localhost/store')
  .then(conn => {
    console.log('connected to mongo');
  })
  .catch(err => {
    console.log('error connect to mongo');
  });

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`running on port ${port}`));
