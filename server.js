const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const User = require('./UserModel.js');
const BlogPost = require('./BlogPostModel.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const STATUS_OKAY = 200;
const server = express();

server.use(cors());
server.use(bodyParser.json());

server.post('/api/users', function(req, res) {
  const newUser = new User(req.body);

  // check the user has all the data    ---  where does it check???
  newUser.save(function(err, user) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Something unbearable happened; could not create the user."});
    } else {
      res.status(STATUS_OKAY).json(user);
    }
  });
});

server.get('/api/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Could not display all users."});
    } else {
      res.status(STATUS_OKAY).json(users);
    }
  })
});

server.get('/api/users/:id', function(req, res) {
  const { id } = req.params;

  User.findById(id, function(err, users) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Could not find user to delete."});
    } else {
      res.status(STATUS_OKAY).json(users);
    }
  });
});

server.delete('/api/users/:id', function(req, res) {
  const { id } = req.params;

  User.findByIdAndRemove(id, function(err, users) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Could not find user to delete."});
    } else {
      res.status(STATUS_OKAY).json(users);
    }
  })
})

server.post('/api/blogposts', function(req, res) {
  const newBlogPost = new BlogPost(req.body);

  newBlogPost.save(function(err, blogpost) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Could not create new blog post."});
    } else {
      res.status(STATUS_OKAY).json(blogpost);
    }
  });
});

server.get('/api/blogposts', function(req, res) {
  BlogPost.find({}, function(err, blogposts) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Could not retrieve all blog posts."});
    } else {
      res.status(STATUS_OKAY).json(blogposts);
    }
  });
});

server.get('/api/blogposts/:id', function(req, res) {
  const { id } = req.params;

  BlogPost.findById(id, function(err, blogposts) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Could not retrieve the specified user"});
    } else {
      res.status(STATUS_OKAY).json(blogposts);
    }
  });
});

server.delete('/api/blogposts/:id', function(req, res) {
  const { id } = req.params;

  BlogPost.findByIdAndRemove(id, function(err, blogpost) {
    if (err) {
      res.status(STATUS_USER_ERROR).json({error: "Could not delete the specified user"});
    } else {
      res.status(STATUS_OKAY).json(`Blog Post ${id} removed.`);
    }
  });
});

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/users', { useMongoClient: true })
  .then(function(db){
    console.log('All your databases are belong to us!');
    server.listen(3456, function() {
      console.log('Server running on port 3456');
    });
  })
  .catch(function(err) {
    console.log('Database connection failed', err.message);
  });
