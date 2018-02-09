 const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const { User, BlogPost }  = require('./models');

const STATUS_USER_ERROR = 422; 
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());


server.post('/users', (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email)  {
    return res.status(STATUS_USER_ERROR)
  .json({error:  "Must provide username, password AND email"});
  }
  const user = new User({ username, password, email });
  user.save((err) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR)
      .json({error: "Internal server error"});
    }
    res.json(user);
  });
});

server.get('/users', (req, res) => {
  const { id } = req.query;
  if (id) {
    User.findById(id, (err, foundUser) => {
      if (err) {
        return res.status(STATUS_SERVER_ERROR)
        .json({error: err});
      }
      res.json(foundUser);
    });
    return;
  }
  User.find({}, (err, data) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR)
      .json({error: 'Internal error occurred while searching for users.'});
    }
    res.json(data);
  });
});

server.delete('/users/', (req, res) => {
  const { id } = req.query;
  if (!id) {    
    return res.status(STATUS_USER_ERROR)
    .json({error:  'You must provide an ID to delete a user'});
  }
  User.findByIdAndRemove(id, (err, deletedUser) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR)
      .json({error: err});
    }
    res.json({success: deletedUser});
  });
});

///////////BLOG POSTS/////////////////

server.post('/posts', (req, res) => {
  const { title, body } = req.body;
  if (!title || !body)  {
    return res.status(STATUS_USER_ERROR)
  .json({error:  "Must provide post title and body!"});
  }
  const post = new BlogPost({ title, body });
  post.save((err) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR)
      .json({error: "Internal server error"});
    }
    res.json(post);
  });
});

server.get('/posts', (req, res) => {
  const { id } = req.query;
  if (id) {
    BlogPost.findById(id, (err, foundPost) => {
      if (err) {
        return res.status(STATUS_SERVER_ERROR)
        .json({error: err});
      }
      res.json(foundPost);
    });
    return;
  }
  BlogPost.find({}, (err, data) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR)
      .json({error: 'Internal error occurred while searching for blog posts.'});
    }
    res.json(data);
  });
});

server.delete('/posts', (req, res) => {
  const { id } = req.query;
  if (!id) {    
    return res.status(STATUS_USER_ERROR)
    .json({error:  'You must provide an ID to delete a blog post'});
  }
  BlogPost.findByIdAndRemove(id, (err, deletedPost) => {
    if (err) {
      return res.status(STATUS_SERVER_ERROR)
      .json({error: err});
    }
    res.json({success: deletedPost});
  });
});



mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost',
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
