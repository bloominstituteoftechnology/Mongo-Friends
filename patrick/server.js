const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Please entaer a NAME.' });
    return;
  }
  const user = new User({ name });
  user.save((err) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(users);
    }
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: `There is no record of the id: ${err.value}` });
    } else {
      res.json(user);
    }
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json({ error: `There is no: ${err.value}` });
    } else if (user === null) {
      res.json({ error: 'user not found' });
    } else {
      res.json({ error: `${user.name} has been deleted` });
    }
  });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});
