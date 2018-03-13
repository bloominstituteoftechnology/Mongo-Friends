const express = require('express');
const BlogPost = require('./BlogPostModel.js');
const blogPostsRouter = express.Router();

//post a blog
blogPostsRouter.post('/', function(req, res){
	if(!req.body.author || !req.body.content || !req.body.tags){
		res.status(400).json({ errorMessage: "Please provide author, content and tags for the blog post." });
	}

	const blogPostInfo = req.body;
	const blogPost = new BlogPost(blogPostInfo);
	blogPost.save().then(savedPost => {
		res.status(201).json(savedPost)
	}).catch(err => {
		res.status(500).json({ error: "There was an error while saving the blog to the database" });
	});
});

// get request
blogPostsRouter.get('/', function(req, res){
	BlogPost.find({})
	.then(posts => {
		res.json(posts);
	})
	.catch(err => {
		res.status(500).json({ error: "The information could not be retrieved." })
	});
});

blogPostsRouter.get('/:id', function(req, res){
	const id = req.params.id;
	BlogPost.findById(id)
	.then(post => {
		if (!post) res.status(404).json({ message: "The post with the specified ID does not exist." });
		res.status(201).json(post);
	})
	.catch(err => {
		res.status(500).json({ error: "The information could not be retrieved." })
	});
});

blogPostsRouter.delete('/:id', function(req, res){
	const id = req.params.id;
	BlogPost.findByIdAndRemove(id).then(deletedPost => {
		if(!deletedPost){
			res.status(404).json({ message: "The post with the specified ID does not exist." });
		}
		res.status(201).json(deletedPost);
	}).catch(err => {
		res.status(500).json({ error: "The post could not be removed" })
	});
});

blogPostsRouter.put('/:id', function(req, res){
	const id = req.params.id;
	const post = req.body;

	if(!req.body.author || !req.body.content || !req.body.tags){
		res.status(400).json({ errorMessage: "Please provide author, content and tags for the blog post." });
	}

	BlogPost.findByIdAndUpdate(id, post, {new: true}).then(post => {
		res.status(200).json(post);
	}).catch(err => {
		res.status(500).json({ error: "The post information could not be modified." });
	});
});

module.exports = blogPostsRouter;