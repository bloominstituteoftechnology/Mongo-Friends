const express = require('express');
const mongoose = require('mongoose');

const Blog = require('./blogModel.js');

const blogRouter = express.Router();

blogRouter.get('/', (req, res) => {
  Blog.find({})
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(err => {
      res.status(400).send({ error: "The information could not be retrieved." });
    });
});

blogRouter.get('/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(post => {
      if(post) res.status(200).send(post);
      else res.status(404).send({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => {
      res.status(500).send({ error: "The information could not be retrieved." });
    });
});

blogRouter.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then(post => {
      res.status(201).send(post);
    })
    .catch(err => {
      res.status(500).send({ error: "There was an error while saving the post to the database", info: err});
    });
});

blogRouter.delete('/:id', (req, res) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(post => {
      if(post) res.status(200).send(post);
      else res.status(404).send({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => {
      res.status(500).send({ error: "The post could not be removed" });
    });
});

blogRouter.put('/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then(post => {
      if(post) res.status(200).send(post);
      else res.status(404).send({ message: "The post with the specified ID does not exist." });
    })
    .catch(err => {
      res.status(500).send({ error: "The post information could not be modified.", info: err });
    })
});

module.exports = blogRouter;