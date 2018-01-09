const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const User = require('./Users/UserModel.js')
const Post = require('./Posts/BlogPostsModel.js')
const server = express();
server.use(bodyParser.json());

server.get('/', (req,res) => {
    res.status(200).json({message:'API running'})
});

server.post('/posts',(req,res) =>{
    const postInformation = req.body;
    if(postInformation.text && postInformation.author){
        const post = new Post(postInformation);
        post.save() // return a  promise
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(error => {
            res.status(500).json({
                error : 'There was an error in saving post to database'
            })
        })
    } else {
        res.status(400).json(
            {
                error: 'Please provide author and text for the post'
            }
        )
    }
})

server.get('/posts', (req,res) =>{
    Post.find({})
        .then(posts => res.status(200).json(posts))
        .catch(error =>{
        req.statusCode(500).json({error: 'The information could not be retrieved.'})
    })
})

server.get('/posts/:id', function(req, res) {
    const { id } = req.params;
    Post.findById(id)
      .then(function(post) {
        res.status(200).json(post);
      })
      .catch(function(error) {
        res.status(500).json({ error: 'The information could not be retrieved.' });
      });
  });

  server.delete('/posts/:id', function(req, res) {
    const id  = req.params.id;
    Post.findByIdAndRemove(id)
      .then(function(result) {
          if(result){
            res.status(200).json(result);
          } else {
              res.status(200).json({message:"There is no such id"})
          }
      })
      .catch(function(error) {
        res.status(500).json({ error: 'Server Error' });
      });
  });

  server.put('/posts/:id', function(req, res) {
    const postInformation = req.body;
    const id  = req.params.id;
    Post.findByIdAndUpdate(id,postInformation)
        .then(function(result) {
            if(result){
            res.status(200).json(result);
            } else {
                res.status(200).json({message:"There is no such id"})
            }
        })
        .catch(function(error) {
        res.status(500).json({ error: 'Server Error' });
        });
      
  });
  

  server.post('/users',(req,res) =>{
    const userInformation = req.body;
    if(userInformation.age && userInformation.lastname && userInformation.firstname){
        const user = new User(userInformation);
        user.save() // return a  promise
        .then(newUser => {
            res.status(201).json(newUser)
        })
        .catch(error => {
            res.status(500).json({
                error : 'There was an error in saving user to database'
            })
        })
    } else {
        res.status(400).json(
            {
                error: 'Please provide age,lastname and firstname of user'
            }
        )
    }
})

server.get('/users', (req,res) =>{
    User.find({})
        .then(users => res.status(200).json(users))
        .catch(error =>{
        req.statusCode(500).json({error: 'The information could not be retrieved.'})
    })
})


server.get('/users/:id', function(req, res) {
    const { id } = req.params;
    User.findById(id)
      .then(function(user) {
        res.status(200).json(user);
      })
      .catch(function(error) {
        res.status(500).json({ error: 'The information could not be retrieved.' });
      });
  });

  server.delete('/users/:id', function(req, res) {
    const  id  = req.params.id;
    User.findByIdAndRemove(id)
      .then(function(result) {
          if(result){
            res.status(200).json(result);
          } else {
              res.status(200).json({message:"There is no such id"})
          }
      })
      .catch(function(error) {
        res.status(500).json({ error: 'Server Error' });
      });
  });
  
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/users',{useMongoClient:true})
.then(function(){
    server.listen(5000,function(){
        console.log('The databases are connected to server')
    });
})
.catch(function(err){
    console.log('Database Connection Failed')
})
