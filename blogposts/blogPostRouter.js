const express = require('express');

const BlogPost = require('./BlogPostModel.js');

const friendModel = require('../friends/FriendModel');

const blogPostRouter = express.Router();

blogPostRouter.get('/', (req,res) => {
    BlogPost.find({})
    .then(blogPosts => {
        res.status(200).json({message:"Here's your blog posts.", blogPosts})
    })
})

blogPostRouter.post('/', (req,res) => {
    const blogPost = req.body;
    const newBlogPost = new BlogPost(blogPost);
    newBlogPost
        .save()
        .then(blogPost => {
            res.status(200).json({message:"Your new blog post.", blogPost})
        })
        .catch(error => {
            res.status(500).json({errorMessage:"Failed to create new blog post."})
        });
})

module.exports = blogPostRouter;