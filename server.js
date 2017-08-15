const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const { User, BlogPost } = require('./models');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { userName, fullName } = req.body;
  if (!userName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide userName' });
    return;
  }
  if (!fullName) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide fullName' });
    return;
  }

  const user = new User({ userName, fullName });
  user.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
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
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.remove({_id: id,}, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json({ success: 'User deleted!' });
    }
  })
});

server.post('/posts', (req, res) => {
  const { title, contents } = req.body;
  if (!title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide title' });
    return;
  }
  if (!contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide contents' });
    return;
  }

  const post = new BlogPost({ title, contents });
  post.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(post);
    }
  });
});







mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/MongoISprint',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});