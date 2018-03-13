const express = require('express');

const BlogPosts = require('./blogPostsModel.js');

const blogPostsRouter = express.Router();


blogPostsRouter.post('/', (req, res) => {
    const postInfo = req.body;
    const post = new BlogPosts(postInfo);

    if (!postInfo.title || !postInfo.body) {
        res.status(400).json({ errorMessage: `Please provide title and body for the post.` });
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

// friendsRouter.get('/:id', (req, res) => {
//     const { id } = req.params;

//     BlogPosts.findById(id)
//     .then(newFriend => {
//         if (!newFriend) {
//             res.status(404).json({ message: "The friend with the specified ID does not exist." });
//         }
//         res.status(200).json(newFriend);
//     })
//     .catch(err => {
//         res.status(500).json({ error: "The information could not be retrieved." });
//     })
// });

// friendsRouter.delete('/:id', (req, res) => {
//     const { id } = req.params;

//     Friends.findByIdAndRemove(id)
    
//     .then(friend => {
//         if (!friend) {
//             res.status(404).json({ message: "The friend with the specified ID does not exist." });
//         }
//         res.status(200).json(friend);
//     })
//     .catch(err => {
//         res.status(500).status({ error: "The friend could not be removed" });
//     });
// });

// friendsRouter.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const friendInfo = req.body;

//     Friends.findByIdAndUpdate(id, friendInfo)

//     .then(friend => {
//         if (!friend) {
//             res.status(404).json({ message: "The friend with the specified ID does not exist." });
//         }
//         res.status(200).json(friend);
//     })
//     .catch(err => {
//         res.status(500).json({ error: "The friend information could not be modified." });
//     });
// });

module.exports = blogPostsRouter;