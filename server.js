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
    const { _id, firstName, lastName } = req.body;
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
    const { id } = req.params;
    Users.findByIdAndRemove(id, (err) => {
        if (err) throw err;
        // console.log(user);
        var response = {
            message: `User successfully deleted`,
            id, 
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
        console.log(req.body);
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

server.get('/blogposts/:id', (req, res) => {
    const { id } = req.params;
    BlogPosts.findById(id, (err, post) => {
        if (err) throw err;
        res.json(post);
    });
});

server.delete('/blogposts/:id', (req, res) => {
    const { id } = req.params;
    BlogPosts.findByIdAndRemove(id, (err, post) => {
        if (err) throw err;
        var response = {
            message: `Post successfully deleted`,
            id
        };
        res.send(response);
    });
});

// ROUTES FOR SPECIFIC USER BLOG-POSTS

server.get('/users/:id/blogposts', (req, res) => {
    BlogPosts.
        find().
        populate('author').
        exec((err, post) => {
            if (err) throw err;
            console.log(post);
            res.json(post);
        })
})



mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
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