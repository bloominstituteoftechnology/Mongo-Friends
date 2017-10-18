const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models.js');
const BlogPost = require('./models2.js');
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;
const server = express();

server.use(bodyParser.json());

// mongoose.connect('mongodb://localhost/users', { useMongoCLient: true });

server.get('/users', (req, res) => {
    User.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

server.get('/users/:id', (req, res) => {
    const { id } = req.params;
    User.findById(id, (err, user) => {
        if (err) throw err;
        res.json(user);
    })
});

server.post('/users', (req, res) => {
    const { name } = req.body;

    const user = new User({ name });

    user.save((err, newUser) => {
        if (err) {
            res.status(STATUS_USER_ERROR)
               .json(err);
        }
        res.json(newUser);
    });
});

server.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove(id, (err, user) => {
        if (err) throw err;
        res.json({ success: true });
    });
});


server.get('/posts', (req, res) => {
    BlogPost.find({}, (err, data) => {
        if (err) throw err;
        res.json(data);
    });
});

server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    BlogPost.findById(id, (err, post) => {
        if (err) throw err;
        res.json(post);
    })
});

server.post('/posts', (req, res) => {
    const { title, contents } = req.body;

    const post = new BlogPost({ title, contents });

    post.save((err, newPost) => {
        if (err) {
            res.status(STATUS_USER_ERROR)
               .json(err);
        }
        res.json(newPost);
    });
});

server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    BlogPost.findByIdAndRemove(id, (err, post) => {
        if (err) throw err;
        res.json({ success: true });
    });
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
    'mongodb://localhost/users',
    { useMongoClient: true }
);

const connect2 = mongoose.connect(
    'mongodb://localhost/posts',
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