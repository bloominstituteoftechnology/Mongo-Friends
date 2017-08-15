const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Model = require('./models');
const User = Model.User;
const Post = Model.Post;


const STATUS_USER_ERRROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
  const { username, password} = req.body;
  if(!username || !password) {
    res.status(422);
    res.json({ error: "Make sure to input username and password" });
  }
  const user = new User({ username, password });
  user.save((err) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error" })
    }
    res.json(user);
  })
})
server.get('/users', (req, res) => {
  User.find({}, (err, data) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error" })
    }
    res.json(data);
  })
})
server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, user) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error" });
    }
    res.json(user);
  })
})
server.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error" })
    }
    res.json(user);
  })
})

server.post('/posts', (req, res) => {
  const { username, comment } = req.body;
  if (!username || !comment) {
    res.status(422);
    res.json({ error: "Input proper data"})
  }
  const post = new Post({ username, comment });
  post.save((err) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error" })
    }
    res.json(post);
  })

})
server.get('/posts', (req, res) => {
  Post.find({}, (err, data) => {
    if (err) {
      res.status(500);
      res.json({ errror: "Server error" });
    }
    res.json(data);
  })
})
server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findById(id, (err, post) => {
    if (err) {
      res.status(500);
      res.json({ error: "Server error"});
    };
    res.json(post);
  })
})
server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  Post.findByIdAndRemove(id, (err, post) => {
    if (err) {
      res.status(500);
      res.json({ error: "Status error" });
    }
    res.json(post);
  })
})

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
