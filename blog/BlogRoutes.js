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

//=========================
//      post GET
//=========================

blogRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  Blog.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    });
});

//=========================
//      post DELETE
//=========================

blogRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  Blog.findByIdAndRemove(id)
    .then(post => {
      if (!post) {
        res.status(404)
        .json({ message: "The post with the specified ID does not exist." });
      }
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

//=========================
//      post PUT
//=========================

blogRouter.put('/:id', (req, res) => {
  const { id } = req.params;
  const postInfo = req.body;
  if (!postInfo.title || !postInfo.body) {
    res.status(400).json({ errorMessage: 'Please provide a Title and a Body for the post.' });
  }
  else {
    Blog.findByIdAndUpdate(id, postInfo, { new: true })
      .then(post => {
        if (!post)
          res.status(404).send({ message: 'The post with the specified ID does not exist.' });
        else {
          res.status(200).send(postInfo);
        }
      })
      .catch(err =>
        res
          .status(500)
          .send({ error: 'The post information could not be modified.' })
      );
  }
});


module.exports = blogRouter;