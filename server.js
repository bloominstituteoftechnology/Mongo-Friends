const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const Friend = require('./friends/model')
const mongoose = require('mongoose')

// Connect to mongo
mongoose
.connect('mongodb://localhost/frienddb')
.then(mongo => {
  console.log('connected to database');
})
.catch(err => {
  console.log('Error connecting', err);
});

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// GET method for initial page
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running' });
});

// GET method for api/friends
server.get('/api/friends', (req, res) => {

  Friend
  .find()
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => [
    res.status(500).json(`{ errorMessage: "The friends information could not be retrieved." }`)
  ])
})

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
