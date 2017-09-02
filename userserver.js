const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const server = express();

server.use(bodyParser.json());

const UserSchema = require('./usersmodels.js');

//----------API--------
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users');

//----POST------
server.post('/users', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(422);
        res.json({ error: 'Missing username or password' });
        return;
    }
    const newUser = new UserSchema({username, password});
    newUser.save((err) => {
        if (err) throw err;
        res.json(newUser);
    });
});

//---GET----
server.get('/users', (req, res) => {
    UserSchema.find({}, (err, User) => {
        if (err) throw err;
        res.json(User);
    });
});

//---GET By ID----
server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    UserSchema.findById(id, (err, User) => {
        if (err) throw err;
        res.json(User);
    });
});

//---DELETE By ID----
server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    UserSchema.findById(id).remove((err, deletedUser) => {
        if (err) throw err;
        res.json(deletedUser);
    })
});


//-------End API----------
server.listen(3000, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on port 3000');
});

