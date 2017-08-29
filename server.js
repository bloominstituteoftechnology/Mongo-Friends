const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const Users = require('./models/users.js');
const BlogPosts = require('./models/blogPosts.js');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

// allow server to parse JSON bodies from POST/PUT/DELETE requests
server.use(bodyParser.json());



// USER ROUTES

server.post('/users', (req, res) => {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName ) {
        res.status(500).json({ message: 'You need both a first name and last name!' });
        return;
    }
    const user = new Users(req.body);
    user.save((err) => {
        if (err) throw err;
        res.status(201);
        res.json( { user, message: 'Thank you!' });
    });
});

server.get('/users', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) throw err;
        // console.log(data[0].blogPosts);
        res.json(data);
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id, (err, user) => {
        if (err) throw err;
        res.json(user);
    });
});

server.delete('/users/:id', (req, res) => {
    const { id, firstName } = req.params;
    Users.findByIdAndRemove(id, (err, user) => {
        if (err) throw err;
        var response = {
            message: "User successfully deleted",
            id, 
            firstName
        };
        res.send(response);
    });
});

// BLOG-POST ROUTES
server.post('/blogposts', (req, res) => {
    const { content, _author } = req.body;
    if (!content ) {
        res.status(500).json({ message: 'You need both a first name and last name!' });
        return;
    }
    const blogPost = new BlogPosts(req.body);
    blogPost.save((err) => {
        if (err) throw err;
        res.status(201);
        res.json( { blogPost, message: 'Thank you!' });
    });
});

server.get('/blogposts', (req, res) => {
    BlogPosts.find({}, (err, data) => {
        if (err) throw err;
        console.log(data[0].author);
        res.json(data);
    });
});







mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/bears',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});