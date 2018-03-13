const express = require('express');
const Blog= require('./BlogModel.js');

const blogRouter = express.Router();

//=========================
//      blog POST
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