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

module.exports = blogPostsRouter;
