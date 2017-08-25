const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

const server = express();
server.use(bodyParser.json());

const queryAndRespond = (query, res) => {
  query.exec((err, result) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const User = require('./user.js');

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
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.post('/users', (req, res) => {
  const { username, age } = req.body;
  const user = new User({ username, age });

  user.save((err) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  }) 
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.remove({ _id: id }, (err) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    } else {
      res.json({ success: true });
    }
  });
});

server.listen(3000);