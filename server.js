const express = require('express');
const mongoose = require('mongoose'); // middleware
const bodyParser = require('body-parser'); // middleware

const User = require('./api/UserModel.js');
const BlogPost = require('./api/BlogPostModel.js');

const server = express();

server.use(bodyParser.json());

server.get('/', function(req, res){
  res.status(200).json({ message: 'api running '});
})

server.post('/users', (req, res) => {
  const userInformation = req.body; // We grab the data from request

// creating new user  
  const user =  new User(userInformation); // create a new document 
  // based on UserModel.js schema,
  // also passing the data in the new function(userInformation)

  user
    .save() //returns a promise and connects newUser to the db automatically
    // also save does the translation to mongodb with mongoose
    .then(function(newUser) {
      res.status(201).json(newUser); // if the request is valid send status 201
      // and send newUser to the database
    })
    .catch(function(error){
      res.status(500).json({ error: 'Cannot save new user to the database' })
    });
})


server.get('/users', function (req, res) {
  User
  .find({})
    .then(function(users) {
      res.status(200).json(users);
    })
    .catch(function(){
      res.status(500).json({ error: 'Cannot return any' })
    });
})


server.get('/users/:id', function(req, res) {
  const { id } = req.params; // getting id from the url params
  User
  .findById(id)
  .then( function (user) {
    res.status(200).json(user);
  })
  .catch(function(){
    res.status(500).json({ error: 'There is no user with that ID' })
  });
})

server.delete('/users/:id', function (req, res) {
  const { id } = req.params;
  
  User.findByIdAndRemove(id)
  .then( function(user) {
    res.status(200).json( { message: 'User terminated *.*' });
  })
  .catch(function(){
    res.status(500).json({ error: 'Could not delete anything' });
  });
});



server.post('/posts', (req, res) => {
  const blogInfo = req.body;
  
  const blog = new BlogPost(blogInfo);

  blog.save()
  .then(function(newPost) {
    res.status(200).json(newPost);
  })
  .catch(function(){
    res.status(500).json({ error: 'Please provide title, author and post!' })
  });
});

server.get('/posts', function (req, res) {
  BlogPost
    .find({})
    .then(function(posts){
      res.status(200).json(posts);
    })
    .catch(function(){
      res.status(500).json({error: 'There are no posts here'})
    });
});

server.get('/posts/:id', function (req,res){
  const { id } = req.params;
  BlogPost
  .findById(id)
  .then(function(post){
    res.status(200).json(post);
  })
  .catch(function(){
    res.status(500).json({ error: 'Cannot find that post'});
  })
})

server.delete('/posts/:id', function (req, res) {
  const { id } = req.params;

  BlogPost
  .findByIdAndRemove(id)
  .then( function(post) {
    res.status(200).json({ message: 'Blog entry has been deleted' });
  })
  .catch(function() {
    res.status(500).json({ error: 'cannot find the specified blog entry' });
  });
});

mongoose.Promise = global.Promise; // Overriding the mongoose promise implementation with JavaScript promise
mongoose
.connect('mongodb://localhost:27017/users', { useMongoClient: true }) // notice that mongo has its own protocol connecting to databases called !mongodb! 
.then(function () {
  server.listen(3000, function(){//
    console.log('All your connection are belong to us!');
  });
})
  .catch(function(err) {
    console.log('Database connection failed')
  })



// [API] <> [mongoose] translate between js objects and BSON(Binary Json) <> [MongoDB Server] <> (database)