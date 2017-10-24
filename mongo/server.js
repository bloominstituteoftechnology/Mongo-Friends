const bodyParser = require('body-parser');
const express = require('express');

const User = require('./user.js');

const server = express();
server.use(bodyParser.json());

const STATUS_USER_ERROR = 422;

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    }
    res.json(users);
  })
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findOne(id, (err, user) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: "Cannot find a user with that ID" });
    }
    res.json(user);
  });
});

server.post('/users', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const user = new User({ firstName, lastName, age });

  user.save((err) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json(err);
    }
    res.json(user);
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.remove({ _id: id }, (err) => {
    if (err) {
      res.status(STATUS_USER_ERROR);
      res.json({ error: "Cannot find a user with that ID" });
    }
    res.json({ success: true });
  });
});

server.listen(3000, () => {
  console.log('server listening on port 3000');
});