

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models');
const BlogPost = require('./blogpost');
const server = express();

server.use(bodyParser.json());
server.use(cors());
const port = process.env.PORT || 3000;

server.get('/', (req, res) => {
res.status(200).json({ message : 'All good on the server' });
});

server.post('/users', (req, res) => {
  const userInfo = req.body; //names a new variable to equal the body of the post
  const user = new User(userInfo); // makes the model user with the input going to the body

  if(!userInfo.firstName) {
    res.status(500).json({
      error: 'No First Name Provided'
    });
  } else {
    user
    .save() // add the info to the database
    .then( (newUser) => { // name the information new user and send it in json format
      res.status(201).json(newUser);
    })
      .catch((error) => {
        res.status(500).json({
          error: 'There was an error while saving the User to the Database'
        });
    });
  };
});

server.get('/users', (req, res) => {
  User
  .find() // finds all users
  .then((users) => { // uploads the info from User as users
    res.status(200).json(users);
  })
  .catch((error) => {
    res.status(500)
    .json({error: 'Cannot get users'});
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params; //
  User
  .findById(id)
  .then( (user) => {
    if(user === null){
      res.status(404).json({message: `no user found`})
    } else {
      res.status(200).json(user)
    }
  })
  .catch((error) => {
    res.status(500)
    .json({error: 'Cannot get users by id'});
  });
});

server.delete('/users/:id', (req, res) => {
const { id } = req.params;
User
.findByIdAndRemove(id)
.then(() => res.status(200).json({message: "user deleted"}))
.catch((error) => {
  res.status(500).json({error: 'Cannot delete user by id'});
  });
});

server.post('/posts', (req, res) => {
const { post, title } = req.body;
const blog = new BlogPost(post, title);
blog
.save()
.then((newpost) => {
  res.status(201).json(newpost);
})
.catch((error) => {
  res.status(500).json({error: error});
});
});

server.get('/posts', (req, res) => {
  BlogPost
  .find()
  .then( (posts) => {
    res.status(200).json(posts)
  })
  .catch((error) => {
    res.status(500)
    .json({error: 'Cannot get posts'});
  });
});

server.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPost
  .findById(id)
  .then( (post) => {
    res.status(200).json(post)
  })
  .catch((error) => {
    res.status(500)
    .json({error: 'Cannot get posts by id'});
  });
});

server.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  BlogPost
  .findByIdAndRemove(id)
  .then( () => {
    res.status(200).json(`{message: "User with id of ${id} removed}"`); 
  })
  .catch((error) => {
    res.status(500)
    .json({error: 'Cannot get users'});
  });
});

mongoose.Promise = global.Promise;

mongoose
.connect('mongodb://localhost/mongo-i', { useMongoClient: true })
  .then( () => {
    server.listen(port, function() {
      console.log(`Database live! at ${port}`);
    });
  })
  .catch((error) => {
    console.log('Database connection failed');
  });
