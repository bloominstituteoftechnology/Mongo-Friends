const express = require('express');
const app = express();
const mongoose = require('mongoose'); //using 5.0 
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
mongoose.Promise = global.Promise;
app.use(bodyParser.json());
app.use(cors());

// models
const User = require('./models/User');

// controllers
const UserController = require('./controllers/UserController');

// routes
app.get('/users', UserController.getUsers);
app.get('/users/:id', UserController.getUserById);
app.post('/users', UserController.addUser);
app.delete('/users/:id', UserController.deleteUserById);

// main
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  app.listen('3000', () => {
    console.log('connected on port 3000');
  });
});