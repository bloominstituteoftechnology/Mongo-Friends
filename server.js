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
    res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
  ])
})

// GET method for specific friend
server.get('/api/friends/:id', (req, res) => {
  const id = req.params.id;

  Friend
  .findById(id)
  .then(responsez => {
    res.status(200).json(response)
    }
  )
  .catch(err => {
    if (err.name === 'CastError') {
      res.status(404).json({ message: "The friend with the specified ID does not exist." })
    }
    res.status(500).json({ errorMessage: "The friend could not be removed" })
  })
})

// POST method for api/friends
server.post('/api/friends', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const age = req.body.age;

  const friend = new Friend({ firstName, lastName, age });

  friend
  .save()
  .then(response => {
    res.status(201).json(response)
  })
  .catch(err => {
    if (!firstName || !lastName || !age) {
      res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
    } else if (isNaN(age)) {
      res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
    } else {
      res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." })
    }
  })
})

// DELETE method for a specific friend by id
server.delete('/api/friends/:id', (req, res) => {
  const id = req.params.id;
  
  Friend
  .findByIdAndRemove(id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(err => {
    if (err.name === 'CastError') {
      res.status(404).json({ message: "The friend with the specified ID does not exist." })
    }
    res.status(500).json({ errorMessage: "The friend could not be removed" })
  })
})

// PUT method for a specific friend by id
server.put('/api/friends/:id', (req, res) => {
  const id = req.params.id;
  const friendInfo = req.body;

  Friend
  .findByIdAndUpdate(id, friendInfo)
  .then(response => {
    res.status(200).json({ friendInfo })
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "The friend could not be removed" })
  })
})


const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
