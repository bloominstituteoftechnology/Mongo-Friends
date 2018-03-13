const express = require('express');

const Post = require('./PostModel.js');

const postsRouter = express.Router();

// /api/posts
postsRouter.post('/', function(req, res) {
    const postFields = req.body;
    console.log(postFields);
    const post = new Post(postFields);
    post
    .save()
    .then(savedPost => {
        if (!postFields.blogger || !postFields.title || !postFields.description) {
            res.status(400).json({ errorMessage: "Please provide blogger, title and description for the blog post." });
        }
        res.status(201).json(savedPost);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the blog post to the database" });
    });
});

postsRouter.get('/', function(req, res) {
    Post.find({})
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The blog post could not be retrieved." });
    });
});

postsRouter.get('/:id', function(req, res) {
    const { id } = req.params;
    Post.findById(id, (err, post)=> {
        if (!post) res.status(404).json({ message: "The blog post with the specified ID does not exist." });
        })
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The blog post could not be retrieved." });
    });
});

postsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    Post.findByIdAndRemove(id, (err, deletedPost) => {
        if (!deletedPost) res.status(404).json({ message: "The blog post with the specified ID does not exist." });
        if (err) res.status(500).json({ error: "The blog post could not be removed" });
        res.status(200).json(deletedPost);
    });
});

postsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const postFields = req.body;
    Post.findByIdAndUpdate(id, postFields, {new: true}, (err, updatedPost) => {
        if (!updatedPost) res.status(404).json({ message: "The blog post with the specified ID does not exist." });
        if (!postFields.blogger || !postFields.title || !postFields.description) res.status(404).json({ errorMessage: "Please provide blogger, title and description for the blog post." });
        if (err) res.status(500).json({ error: "The blog post information could not be modified." });
        res.status(200).json(updatedPost);
    });
});

module.exports = postsRouter;
