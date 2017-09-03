const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const server = express();

server.use(bodyParser.json());

const BlogPosts = require('./postsmodels.js');

//----------API--------
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/posts');

//----POST------
server.post('/posts', (req, res) => {
    const { blog } = req.body;
    if (!blog) {
        res.status(422);
        res.json({ error: 'Missing post content' });
        return;
    }
    const newBlog = new BlogPosts({blog});
    newBlog.save((err) => {
        if (err) throw err;
        res.json(newBlog);
    });
});

//---GET----
server.get('/posts', (req, res) => {
    BlogPosts.find({}, (err, newBlog) => {
        if (err) throw err;
        res.json(newBlog);
    });
});

//---GET By ID----
server.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    BlogPosts.findById(id, (err, newBlog) => {
        if (err) throw err;
        res.json(newBlog);
    });
});

//---DELETE By ID----
server.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    BlogPosts.findById(id).remove((err, newBlog) => {
        if (err) throw err;
        res.json(newBlog);
    })
});


//-------End API----------
server.listen(3000, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Server is listening on port 3000');
});

