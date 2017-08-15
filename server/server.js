const express = require('express');
const bodyParser = require('body-parser');

const { mongoose, connect } = require('./db/mongoose');
const User = require('./models/user');
const BlogPost = require('./models/post');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const server = express();

server.use(bodyParser.json());

/*
[GET] /posts This route will return an array of all blog posts.
[GET] /posts/:id This route will return the blog post with the matching id property.
[DELETE] /posts/:id This route should delete the specified blog post. Your user objects can take any form.
*/

// POST posts route
server.post('/posts', (req, res) => {
  const { title, text } = req.body;
  console.log(req.body);
  if (!title || !text) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide "title" and "text"' });
    return;
  }
  const post = new BlogPost({ title, text });
  post.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(post);
    }
  });
});

// GET posts route *
server.get('/posts', (req, res) => {
  BlogPost.find({}, (err, posts) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(posts);
    }
  });
});

// GET posts by id route *
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPost.findById(id, (err, post) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(post);
    }
  });
});

// DELETE post by id route *
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPost.findByIdAndRemove(id, (err, post) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json({ message: 'Post has been deleted', id });
    }
  });
});


// POST users route
server.post('/users', (req, res) => {
  const { username } = req.body;
  if (!username) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'Must provide a username' });
    return;
  }
  const user = new User ({ username });
  user.save((err) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json(user);
    }
  });
});

// GET users route
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

// GET users by id route
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

// DELETE user by id route
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      res.status(STATUS_SERVER_ERROR);
      res.json(err);
    } else {
      res.json({ message: 'User has been deleted', id });
    }
  })
})

// EDIT => Broke DB out into its own separate file

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
