const express = require('express');
const Blog= require('./BlogModel.js');

const blogRouter = express.Router();


//=========================
//      blog POST
//=========================

blogRouter.post('/', (req, res) => {
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.body) {
    res.status(400).json({ errorMessage: "Please provide a Title and a Body for the post." });
  } else {
  const post = new Blog(postInfo);
  post
    .save()
    .then(savedPost => {
      res.status(201).json(savedPost);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the post to the database" });
    });
  }
});

//=========================
//      blog GET
//=========================

blogRouter.get('/', (req, res) => {
  Blog.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});


module.exports = blogRouter;