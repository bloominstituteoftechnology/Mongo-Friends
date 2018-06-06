const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const friendsController = require('./friends/friendsController');
const contactController = require('./friends/contactController');
const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.use('/api/friends', friendsController);
server.use('/api/contacts', contactController);

const port = process.env.PORT || 5000;
mongoose.promise = global.Promise;
mongoose.connect('mongodb://localhost/frienddb', {}, err => {
  if (err)  console.log(err);
  console.log('Successfully connected to MongoDB')
});

server.listen(port, () => {console.log(`\n=== API up on port: ${port} ===\n`)});
