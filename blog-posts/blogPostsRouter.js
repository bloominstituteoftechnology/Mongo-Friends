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

  if (!newPost.userName || !newPost.postContent) {
    res.status(400).json({ err: 'You need to provide both a userName and postContent' })
  }

  blogPost
    .save()
    .then(savedPost => {
      res.status(201).json(savedPost);
    })
    .catch(err => {
      if (err.errors.postContent.kind === 'maxlength') {
        res.status(404).json({ err: 'Your post exceeded the max length' });
      }
      res.status(500).json({
        msg: 'There was an error while saving the friend to the database',
        err: err,
      });
    });
});
module.exports = blogPostsRouter;
