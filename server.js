const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Bear = require('./Bears/BearModel.js');

const server = express();

server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json({ message: 'API running' });
});

server.post('/api/bears', (req, res) => {
  const bearInformation = req.body;

  if (bearInformation.species && bearInformation.latinName) {
    const bear = new Bear(bearInformation);

    bear
      .save() // returns a promise
      .then(function(newBear) {
        res.status(201).json(newBear);
      })
      .catch(function(error) {
        res.status(500).json({
          error: 'There was an error while saving the Bear to the Database',
        });
      });
  } else {
    res.status(400).json({
      errorMessage: 'Please provide both species and latinName for the Bear.',
    });
  }
});

server.get('/api/bears', function(req, res) {
  Bear.find({})
    .then(function(bears) {
      res.status(200).json(bears);
    })
    .catch(function(error) {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

server.get('/api/bears/:id', function(req, res) {
  const { id } = req.params;

  Bear.findById(id)
    .then(function(bear) {
      res.status(200).json(bear);
    })
    .catch(function(error) {
      res
        .status(500)
        .json({ error: 'The information could not be retrieved.' });
    });
});

// db related plumbing code
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/bears', { useMongoClient: true })
  .then(function() {
    server.listen(5000, function() {
      console.log('All your databases are belong to us!');
    });
  })
  .catch(function(error) {
    console.log('Database connection failed');
  });
