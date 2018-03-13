const express = require('express');
const mongoose = require('mongoose');
const friendModels = require('./friendModels');

const BlogPostModel = mongoose.model('BlogPost');

const postRouter = express.Router();

// '/api/posts
postRouter.post('/', (req, res) => {
  const info = req.body;
  if (!info.title || !info.content)
    res.status(400).json({ error: 'Post must include a title and content' });
  else {
    const post = new BlogPostModel(info);
    post
      .save()
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ error: err.message });
      });
  }
});

postRouter.get('/', (req, res) => {
  BlogPostModel.find({})
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err =>
      res.status(500).json({ error: 'The information could not be retrieved.' })
    );
});

postRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  BlogPostModel.findByIdAndRemove(id)
    .then(post => {
      if (!post)
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
        });
      else res.status(200).json(post);
    })
    .catch(err =>
      res.status(500).json({ error: 'The post could not be removed' })
    );
});

postRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const info = req.body;
  if (!info.title || !info.content)
    res.status(400).json({
      errorMessage:
        'Please provide title and content for the post.',
    });
  else {
    BlogPostModel.findByIdAndUpdate(id, info, { new: true })
      .then(post => {
        if (!post)
          res.status(404).send({
            message: 'The post with the specified ID does not exist.',
          });
        else res.status(200).send(info);
      })
      .catch(err =>
        res
          .status(500)
          .send({ error: 'The post information could not be modified.' })
      );
  }
});

module.exports = postRouter;
