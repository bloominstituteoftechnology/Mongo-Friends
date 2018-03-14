const express = require('express');
const BlogPost = require('./blogPostsModel.js');
const blogPostsRouter = express.Router();

blogPostsRouter.get('/', (req, res) => {
  BlogPost.find({})
    .then(blogPosts => {
      res.status(200).json(blogPosts);
    })
    .catch(err => {
      res.status(500).json({ err: 'The information cannot be retrieved' });
    });
});

blogPostsRouter.post('/', (req, res) => {
  const newPost = req.body;
  const blogPost = new BlogPost(newPost);
  
  blogPost.save().then(savedPost => {
    res.status(201).json(savedPost);
  })
    .catch(err => {
      res.status(500).json({
        msg: 'There was an error while saving the friend to the databse',
        err: err
      })
    })
  
})
module.exports = blogPostsRouter;
