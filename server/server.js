const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models');

const server = express();

server.use(bodyParser.json());
server.use(cors());

server.get('/', (req, res) => {
res.status(200).json({ message : 'All good on the server' });
});

server.post('/users', (req, res) => {
  const userInfo = req.body;
  const user = new User(userInfo);

  if(!userInfo.firstName) {
    res.status(500).json({
      error: 'No First Name Provided'
    });
  } else {
    user
    .save()
    .then( (newUser) => {
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
  User.find({})
  .then((users) => {
    res.status(200).json(users);
  })
  .catch((error) => {
    res.status(500)
    .json({error: 'Cannot get users'});
  });
});

server.get('/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id)
  .then( (user) => {
  res.status(200).json(user)
  })
  .catch( (error) => {
    {error: 'Cannot get user id'}
});
});
mongoose.Promise = global.Promise;

server.delete('/users/:id', (req, res) => {
const { id } = req.params;
User.findByIdAndRemove(id, () => {
response = {
  message: "User removed",
  id: User.id
};
res.status(200).send(response);
})
});
mongoose
.connect('mongodb://localhost:27017/users', { useMongoClient: true })
  .then( () => {
    server.listen(5000, function() {
      console.log('Database live!');
    });
  })
  .catch((error) => {
    console.log('Database connection failed');
  });
