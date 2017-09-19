const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());
mongoose.connect('mongodb://localhost/', { useMongoClient: true });
const { User } = require('./models');

server.post('/users', (req, res) => {
    const { userName } = req.body;
    const newUser = new User ({ userName });
    newUser.save(newUser, (err, user) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'There has been a save error' });
            return;
        } else {
            res.json({ user });
        }
    });
});

server.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (!err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'User not found' });
            return;
        } else {
            res.json({ users });
        }
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'We could not find a user with that id' });
            return;
        } else {
            res.json({ user });
        }
    });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, (err, deleted) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'Could not delete a user with that id' });
            return;
        } else {
            res.json({ deleted });
        }
    });
});

server.post('/posts', (req, res) => {
    const { title, contents } = req.params;
    const newPost = new Post ({ title, contents });
    newPost.save(newPost, (err, post) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'Post not saved' });
            return;
        } else {
            res.json({ post });
        }
    });
});

server.get('/posts', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ err: 'Could not get posts' });
            return;
        } else {
            res.json({ posts });
        }
    });
});

server.get('/posts/:id', () => {
    const { id } = req.params;
    Post.findById(id, (err, post) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'Could not find a post with that id' });
            return;
        } else {
            res.json({ post });
        }
    });
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    Post.findByIdAndRemove(id, (err, deleted) => {
        if (err) {
            res.status(STATUS_USER_ERROR);
            res.json({ error: 'Could not delete that post' });
            return;
        } else {
            res.json({ deleted });
        }
    });
});

mongoose.Promise = global.Promise;



server.listen(3000);