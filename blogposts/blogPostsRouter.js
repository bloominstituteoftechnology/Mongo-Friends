const express = require('express');

const BlogPosts = require('./blogPostsModel.js');

const blogPostsRouter = express.Router();


blogPostsRouter.post('/', (req, res) => {
    const postInfo = req.body;
    const post = new BlogPosts(postInfo);

    if (!postInfo.title || !postInfo.body) {
        return res.status(400).json({ errorMessage: `Please provide title and body for the post.` });
    }
        post
        .save()
        .then(newPost => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error while saving the post to the database` });
        })

});

blogPostsRouter.get('/', (req, res) => {
    BlogPosts.find({})
    .then(post => {
        console.log('Posts retrieved.')
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: "The information could not be retrieved." })
    })
});

blogPostsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    BlogPosts.findById(id)
    .then(newPost => {
        if (!newPost) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(newPost);
    })
    .catch(err => {
        res.status(500).json({ error: "The information could not be retrieved." });
    })
});

blogPostsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    BlogPosts.findByIdAndRemove(id)
    
    .then(post => {
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).status({ error: "The post could not be removed" });
    });
});

blogPostsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const postInfo = req.body;

    BlogPosts.findByIdAndUpdate(id, postInfo)

    .then(post => {
        if (!post) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        res.status(200).json(post);
    })
    .catch(err => {
        res.status(500).json({ error: "The post's information could not be modified." });
    });
});

module.exports = blogPostsRouter;