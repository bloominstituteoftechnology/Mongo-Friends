const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./models/users');
const BlogPosts = require('./models/blog-posts');
const server = express();

server.use(bodyParser.json());

server.post('/users', (req, res) => {
    const { name, email } = req.body;
    const user = new Users({ name, email });
    user.save((err) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Save User" });
            return;
        }
        res.json(user);
    });
});

server.get('/users', (req, res) => {
    Users.find({}, (err, data) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Retrieve Users" });
            return;
        }
        res.json(data);
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    Users.findById(id, (err, user) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Retrieve User" });
            return;
        }
        res.json(user);
    });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    Users.findByIdAndRemove(id, (err) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Remove User" });
            return;
        }
        res.json({ "Success": "User was removed"});
    });
});

server.post('/posts', (req, res) => {
    const { title, post, date } = req.body;
    const blogPost = new BlogPosts({title, post, date});
    blogPost.save((err) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Save Blog Post" });
            return;
        }
        res.json(blogPost);
    });
});

server.get('/posts', (req, res) => {
    BlogPosts.find({}, (err, data) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Retrieve Blog Posts" });
            return;
        }
        res.json(data);
    });
});

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    BlogPosts.findById(id, (err, post) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Retrieve Post" });
            return;
        }
        res.json(post);
    });
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    BlogPosts.findByIdAndRemove(id, (err) => {
        if (err) {
            res.status(500);
            res.json({ error: "Internal Server Error, Can Not Remove Post" });
            return;
        }
        res.json({ "Success": "Post was removed" });
    });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect('mongodb://localhost/',
    { useMongoClient: true });

connect.then(() => {
    const port = 3000;
    server.listen(port);
    console.log('server listening on 3000');
}, (err) => {
    console.log("ERROR: Could not connect to mongodb");
});