const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');

const User = require('./UserModel.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const server = express();

server.use(cors());

server.use(bodyParser.json());

server.get('/api/users', function(req, res) {
  User.find({}, function(err, data) {
    if(err) {
      throw err;
    } else {
      res.json(data);
    }
  });
  // res.status(200).json({ running: 'yes' });
});

server.get('/api/users/:id', function(req, res) {
  const { id } = req.params;

  User.findOne({ _id: id }, function(err, users) {
    if(err){
      //handle error
    } else {
      res.status(200).json(users);
    }
  })
});

server.delete('/api/users/:id', function(req, res) {
  const { id } = req.params;

  User.findOneAndRemove({ _id: id }, function(err, users) {
    if(err) {
      console.log(err);
      return res.status(500).json(users)
    } else {
      res.status(200).json(users);
    }
  })

});

server.post('/api/users', function(req, res) {
  const newUser = new User(req.body);

  newUser.save(function(err, user) {
    if(err) {
      res.status(STATUS_SERVER_ERROR).json({ error: "Could not get the user"});
    } else {
      res.status(200).json(user)
    }
  });
})


//connect to Mongoose
mongoose.Promise = global.Promise;
mongoose
.connect('mongodb://localhost:27017/users', { useMongoClient: true})
.then(function(db) {
  console.log('All your databases are belong to us!');
  server.listen(3000, function() {
    console.log('Running on port 3000...');
  });
   
})
.catch(function(err) {
  console.log('Database Connection failed', err.message);
})


