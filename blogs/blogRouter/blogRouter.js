const express = require('express');
const mongoose = require('mongoose');
const Blog = require('../blogModel/blogModel.js');

const blogRouter = express.Router();

blogRouter.post('/', function(req, res) {
  const blogInfo = req.body;
  const blog = new Blog(blogInfo);

  blog.save()
    .then(inBlog => {
      res.status(201).json(inBlog);
    })
    .catch(err => {
      if (err.errors.passWord) {
        res.status(400).json({ errorMessage: err.errors.passWord.message }).end();
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ errorMessage: "Please provide a valid username, password, and blog content." }).end();
      } else {
        res.status(500).json({ error: "There was an error while saving the blog to the database" }).end();
      }
    });
});

blogRouter.get('/', function(req, res) {
  Blog.find({})
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." }).end();
    });
});

blogRouter.get('/:id', function(req, res) {
  const blogId = { _id: req.params.id };
  Blog.findById(blogId)
    .then(blog => {
      res.status(200).json(blog)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The blog with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The information could not be retrieved." }).end();
      }
    });
});

blogRouter.put('/:id', function(req, res) {
  const blogId = { _id: req.params.id };
  const updateBlog = req.body;
  Blog.findByIdAndUpdate(blogId, updateBlog, { new: true, runValidators: true } )
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The blog with the specified ID does not exist." });
      } else if (err.name === 'ValidationError') {
        res.status(400).json({ errorMessage: "Please provide userName and pwd for the blog." }).end();
      } else {
        res.status(500).json({ error: "The blog information could not be modified." }).end();
      }
    });
});

blogRouter.delete('/:id', function(req, res) {
  const blogId = { _id: req.params.id };
  Blog.findByIdAndRemove(blogId)
    .then(doc => {
      res.status(200).json(doc)
    })
    .catch(err => {
      if (err.name === 'CastError') {
        res.status(404).json({ message: "The blog with the specified ID does not exist." });
      } else {
        res.status(500).json({ error: "The blog could not be removed" }).end();
      }
    });
});

module.exports = blogRouter;
