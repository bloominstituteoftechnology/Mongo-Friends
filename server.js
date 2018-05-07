const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const mongoose = require('mongoose');

// connect to mongo
mongoose
  .connect('mongodb://localhost/frienddb')
  .then(mongo => {
    console.log('conneced to database');
  })
  .catch(err => {
    console.log('Error connecting to database', err);
  });

const friendsController = require('./friends/friendsController');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

server.post('api/friends', (req, res) => {

})

server. delete('api/friends/:id', (req, res) => {

})

server.put('api/friends/:id', (req, res) => {
  

})

server.use('/api/friends', friendsController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
