/* eslint */
const express = require('express');

const BlogPost = require('./blogPostModel.js');
const statusCodes = require('../common/statusErrors.js');
const Users = require('../users/userModel.js');

const blogRouter = express.Router();

/* *** Blog Posts *** */
blogRouter.get('/', (req, res) => {
  BlogPost.find({}, (err, posts) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.postNotFoundMessage);
    else res.status(statusCodes.success).send(posts);
  });
});

blogRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  BlogPost.findById(id, (err, post) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.postNotFoundMessage);
    else res.status(statusCodes.success).send(post);
  });
});

blogRouter.post('/', (req, res) => {
  const { title, content, } = req.body;

  const user = Users.findOne({ loggedIn: true }, (err, user) => {
    if (err) res.status(statusCodes.notLoggedIn).send(statusCodes.notLoggedInMessage);
    return user;
  })
  .then((user) => {
    const newPost = new BlogPost({ title, content, user, });
    newPost.save((err, post) => {
      if (err) res.status(statusCodes.serverError).send(statusCodes.serverErrorMessage);
      else res.status(statusCodes.successCreated).send(post);
    });
  });
});

blogRouter.delete('/', (req, res) => {
  const { id } = req.body;

  BlogPost.findById(id, (err, post) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.serverErrorMessage);
    else return post;
  }).remove((err, confirm) => {
    if (err) res.status(statusCodes.serverError).send(statusCodes.serverErrorMessage);
    else res.status(statusCodes.success).send(confirm);
  });
});

module.exports = blogRouter;