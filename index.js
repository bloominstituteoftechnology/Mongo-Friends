const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('../Mongo-I/Users/models');
const BlogPosts = require('../Mongo-I/BlogPosts/models');

const server = express();
const port = process.env.PORT || 3000;

server.use(cors());
server.use(bodyParser.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'All good on the server' });
});

server.get('/users', (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => console.log('you done messed up now'));
});

server.post('/users', (req, res) => {
  const userInfo = req.body;
  const user = new Users(userInfo);
  if (!userInfo.firstName) {
    res.status(500).json({ message: 'Must have a name' });
  } else {
    user
      .save()
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => console.log('nope'));
  }
});

server.get('/users/:id', (req, res) => {
  // path, : means it's a query, then the homies
  const { id } = req.params;
  // define id and attach to params, we destructured it to make it easier to search for just id, and added it as a property to the params
  User.findById(id)
    .then(user => {
      if (user === null) {
        res.status(404).json({ message: `no user found` });
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Cannot get users by id' });
    });
});

server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(() => res.status(200).json({ message: 'Deleted' }))
    .catch(error => {
      res.status(500).json({ error: 'Cannot delete user by id' });
    });
});

server.post('/posts', (req, res) => {
  const post = req.body;
  const blog = new BlogPosts();
  blog
    .save()
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: 'Cannot post new blogpost' });
    });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPosts.findByIdAndRemove(id)
    .then(() => {
      res.status(200).json(`{message: "User with id of ${id} removed}"`);
    })
    .catch(error => {
      res.status(500).json({ error: 'Cannot get users' });
    });
});

mongoose.Promise = global.Promise;

mongoose
  .connect('mongodb://localhost/mongo-i')
  .then(() => {
    server.listen(port, function() {
      console.log(`Database live! at ${port}`);
    });
  })
  .catch(error => {
    console.log('Database connection failed');
  });
