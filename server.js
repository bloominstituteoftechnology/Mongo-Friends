const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./model.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());

// TODO: write your server code here
server.post('/users', (req, res) => {
  const { christianName, surName } = req.body;
  if (!christianName || !surName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Need a species or a latinName' });
    return; // stop here
  }
  // create our user save it and send it back as a json response
  const user = new User({ christianName, surName });
  user.save()
  .then(function (user) {
    res.json(user);
  })
  .catch(function(error) {
    res.status(500).json({error: 'There was an error while saving the user to the Database',})
  });
});

server.get('/users', (req, res) => {
  User.find({})
  .then(function (users) {
    res.json(users);
  })
  .catch(function(error) {
    res.status(500).json({error: 'The info could not be retreived',})
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;  // we can't check for id in the normal way because if no id is sent the
                              // route won't match and then there is no point writing code like if (!id)
                              // as it won't be ran
  User.findByIdAndRemove(id)
  .then(function (users) {
    res.json('user sucessfully deleted');
  })
  .catch(function(error) {
  res.status(500).json({error: 'The info could not be deleted',})
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;  // we can't check for id in the normal way because if no id is sent the
                              // route won't match and then there is no point writing code like if (!id)
                              // as it won't be ran
  User.findById(id)
  .then(function (users) {
    res.json(users);
  })
  .catch(function(error) {
  res.status(500).json({error: 'The info could not be retreived',})
  });
});

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/bears', { useMongoClient: true })
  .then(function() {
    server.listen(3000, function() {
      console.log('All your databases are belong to us!');
    });
  })
  .catch(function(error) {
    console.log('Database connection failed');
  });
