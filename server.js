const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./user');
const BlogPost = require('./blogPost');


const server = express();
server.use(bodyParser.json());
server.use(cors());

// Users
server.post('/users', (req, res) => {
    const { fullName, email, age, password } = req.body;
    if(!fullName || !email || !password ) {
        res.status(422).send({error: "You are missing one of the important components to create a user"})
        return;
    }
    const newUser = new User({ fullName, email, age, password });
    newUser.save((err, user) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            res.json(user);
        }
    })
});

server.get('/users', (req, res) => {
    User
        .find()
        .exec((err, users) => {
            if (err) {
                res.status(500).send(err);
                return;
            } else {
                res.json(users);
            }

        })
});

server.get('/users/:id', (req, res) => {
    User
        .findById(req.params.id)
        .exec((err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(user);
            }
        })
});

server.put('/users/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new:true, upsert: true, safe: true}, 
            (err, response) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                } else {
                    res.json(response);
                }
            })

});

server.delete('/users/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id, 
            (err, response) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(response);
                }
            })
});

// Blog Posts
server.post('/posts', (req, res) => {
    const { title, author, content } = req.body;
    const newPost = new BlogPost({ title, author, content });
    newPost.save((err, post) => {
        if (err) {
            res.status(500).send(err);
            return;
        } else {
            res.json(post);
        }
    })
});

server.post('/posts/:id/comment', (req, res) => {
    const { author, comment } = req.body;
    BlogPost
        .findByIdAndUpdate(req.params.id,             
            { $push: { 'comments' : { author, comment }}}, 
            { new: true, upsert: true, safe: true }, 
            (err, response) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                } else {
                    res.json(response);
                }
            })
});

server.get('/posts', (req, res) => {
    BlogPost
        .find()
        .populate('author')
        .exec((err, posts) => {
            if (err) {
                res.status(500).send(err);
                return;
            } else {
                res.json(posts);
            }
        })
});

server.get('/posts/:id', (req, res) => {
    BlogPost
        .findById(req.params.id)
        .populate('author')
        .exec((err,post) => {
            if (err) {
                res.status(500).send(err);
                return;
            } else {
                res.json(post);
            }
        })
});

server.put('/posts/:id', (req, res) => {
    BlogPost
        .findByIdAndUpdate(req.params.id, 
            { $set: req.body }, 
            { new: true, upsert: true, safe: true }, 
            (err, response) => {
                if (err) {
                    res.status(500).send(err);
                    return;
                } else {
                    res.json(response);
                }
            })
});

server.delete('/posts/:id', (req, res) => {
    BlogPost
        .findByIdAndRemove(req.params.id, (err, response) => {
            if (err) {
                res.status(500).send(err);
                return;
            } else {
                res.json(response);
            }
        })
});



mongoose.Promise = global.Promise;
const connect = mongoose.connect(
    'mongodb://localhost/lambda-mongo-I',
    {useMongoClient: true}
);
connect.then(() => {
    const port = 3000;
    server.listen(port);
    console.log('Server is listening on ' + port);
}, (err) => {
    console.log('\n************************');
    console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
    console.log('************************\n');
})