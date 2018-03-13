const express = require('express');
const fakeBookPosts = require('./blogPostModel');
const fakeBookPostsRouter = express.Router();

fakeBookPostsRouter.post('/', function(req, res) {
  const postInfo = req.body;
  const newPost = new fakeBookPosts(postInfo);
    if (!newPost.author || !newPost.title || !newPost.content) {
      res.status(400).json({error: 'Please, provide a title, author, and content to your post.'});
    } else {
      newPost
        .save()
        .then(savedPost => {
          res.status(201).json(savedPost);
        })
        .catch(err => {
          res.status(500).json({error: 'There was an error while saving your post.'})
        });
    }
});

fakeBookPostsRouter.get('/', function(req, res) {
    fakeBookPosts
      .find({})
      .then(posts => {
          res.status(200).json(posts);
      })
      .catch(err => {
          res.status(500).json({error: 'The information could not be retrieved'})
      });
});

fakeBookPostsRouter.get('/:id', function(req, res) {
  const { id } = req.params
  fakeBookPosts
    .findById(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: 'The post you tried to get doesn\'t exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'The information could not be retrieved'});
    });
});

fakeBookPostsRouter.delete('/:id', function(req, res) {
  const { id } = req.params
  fakeBookPosts
    .findByIdAndRemove(id)
    .then(post => {
      if (!post) {
        res.status(404).json({ message: 'You tried to delete a post that does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res.status(500).json({error: 'The post could not be removed'});
    });
});

fakeBookPostsRouter.put('/:id', function(req, res) {
  const { id } = req.params
  const updateInfo = req.body;
  if (!updateInfo.title || !updateInfo.author || !updateInfo.content) {
    res.status(400).json({error: 'Please, provide a title, author, and content for your post.'});
  } else {
    fakeBookPosts
      .findByIdAndUpdate(id, updateInfo, {new: true})
      .then(post => {
        if (!post) {
          res.status(404).json({ message: 'The post you tried to modify does not exist.' });
        } else {
          res.status(200).json(post);
        }
      })
      .catch(err => {
        res.status(500).json({error: 'The post could not be modified'});
      });
  }
});


module.exports = fakeBookPostsRouter;