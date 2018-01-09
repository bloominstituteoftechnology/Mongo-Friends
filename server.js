const express = require ('express');
const mongoose = require( 'mongoose');
const bodyParser= require('body-parser');
const cors= require('cors');

const server = express();

const User= require('./Users/UserModel.js');
const Post= require('./BlogPosts/PostModel.js');

server.use(bodyParser.json());
server.use(cors());

server.get('/', function (req,res) {
res.status(200).json( {message: "API running"});
});

server.post('/users',function(req,res) {
    const userInformation = req.body;
    
    const user = new User(userInformation);

    user
    .save()
    .then(function(newUser) {
    res.status(201).json(newUser);
    })
    .catch(function(error) {
        res.status(500).json({error:"Problem saving User",
    });
    });
});

server.get('/users', function(req,res) {
    User.find({})
    .then(function(users) {
        res.status(200).json(users);
    })
    .catch(function() {
        res.status(500).json({error: "Problem obtaining information"});

    });
});

server.get('/users/:id', function(req,res) {
    const { id } = req.params;
    User.findById(id)
    .then(function(user ){
        res.status(200).json(user);
    })
.catch(function(error) {
    res.status(500).json({error: "The information cannot be obtained"});
});
});

server.delete('/users/:id', function(req,res) {
    const { id } = req.params;
    User.findByIdAndRemove( id, function(error) {
        if(error) 
        res.status(500).json({error:"The User could not be deleted"});
     else 
        res.status(200).json({ message: "The user has been deleted"});
});
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users', { useMongoClient: true})
.then(function() {
    server.listen(5000, function() {
        console.log("Server running on port 5000");
    });
})
.catch(function(error) {
    console.log("connection failed")
});


server.post('/posts', function(req,res) {
    const postInformation = req.body;
    
    const post = new Post(postInformation);

    post
    .save()
    .then(function(newPost) {
    res.status(201).json(newPost);
    })
    .catch(function(error) {
        res.status(500).json({error:"Problem saving Post",
    });
    });
});

server.get('/posts', function(req,res) {
    User.find({})
    .then(function(posts) {
        res.status(200).json(posts);
    })
    .catch(function() {
        res.status(500).json({error: "Problem obtaining information"});

    });
});

server.get('/posts/:id', function(req,res) {
    const { id } = req.params;
    Post.findById(id)
    .then(function(post){
        res.status(200).json(post);
    })
.catch(function(error) {
    res.status(500).json({error: "The information cannot be obtained"});
});
});

server.delete('/posts/:id', function(req,res) {
    const { id } = req.params;
    Post.findByIdAndRemove( id, function(error) {
        if(error) 
        res.status(500).json({error:"The Post could not be deleted"});
     else 
        res.status(200).json({ message: "The post has been deleted"});
});
});

