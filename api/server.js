const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./Users/UserModel');
const BlogPost = require('./Blogposts/BlogPostModel');

const server = express();

server.use(bodyparser.json());
server.use(cors());

const port = process.env.PORT || 5000;

// Routes
server.post('/api/users', (req, res) => {
  const userInfo = req.body;
  const { userName, firstName, lastName } = req.body;
  if (!userName || !firstName || !lastName) {
    res.status(400).json({ error: 'Please fill in all the information' });
  } else {
    const user = new User(userInfo);

    user
      .save()
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error while saving User to Database'
        });
      });
  }
});

server.get('/api/users', (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: 'The information could not be retrieved' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: 'The information could not be retrieved' });
    });
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(user => {
      res.status(200).json({ message: 'User has been successfully deleted' });
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not delete user' });
    });
});

server.post('/api/posts', (req, res) => {
  const blogPostInfo = req.body;
  console.log(blogPostInfo);
  const { title, body } = req.body;
  if (!title || !body) {
    res.status(400).json({ error: 'Must have title and body' });
  } else {
    const post = new BlogPost(blogPostInfo);

    post
      .save()
      .then(newPost => {
        res.status(201).json(newPost);
      })
      .catch(error => {
        res.status(500).json({
          error: 'There was an error adding your blog post to the database'
        });
      });
  }
});

server.get('/api/posts', (req, res) => {
  BlogPost.find({})
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(500).json({ error: 'The information could not be retrieved' });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPost.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(() => {
      res.status(500).json({ error: 'The information could not be retrieved' });
    });
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPost.findByIdAndRemove(id)
    .then(postr => {
      res.status(200).json({ message: 'User has been successfully deleted' });
    })
    .catch(() => {
      res.status(500).json({ error: 'Could not delete user' });
    });
});

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/users', { useMongoClient: true })
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Database connection failed');
  });
