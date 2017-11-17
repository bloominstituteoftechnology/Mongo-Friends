const express = require("express");

const BlogPost = require("./BlogPostModel.js");
const statusCodes = require("../common/statusCodes.js");

const blogRouter = express.Router();

//Blog Posts
blogRouter.post("/", function(req, res) {
    const newBlogPost = new BlogPost(req.body);

    newBlogPost.save(function(err, blogpost) {
        if (err) {
            res
                .status(statusCodes.userError)
                .json({ error: "could not create new blog post" });
        } else {
            res.status(statusCodes.created).json(blogpost);
        }
    });
});

//get posts gose here
blogRouter.get("/", function(req, res) {
    BlogPost.find({}, function(err, blogposts) {
        if (err) {
            res
                .status(statusCodes.userError)
                .json({ error: "could not retrive all blog posts" });
        } else {
            res.status(statusCodes.success).json(blogposts);
        }
    });
});

blogRouter.get("/:id", function(req, res) {
    const { id } = req.params;

    BlogPost.findById(id, function(err, blogposts) {
        if (err) {
            res
                .status(statusCodes.userError)
                .json({ error: "could not retrive the specified blog post" });
        } else {
            res.status(statusCodes.success).json(blogposts);
        }
    });
});

blogRouter.delete("/:id", function(req, res) {
    const { id } = req.params;

    BlogPost.findByIdAndRemove(id, function(err, blogpost) {
        if (err) {
            res.status(statusCodes.userError).json({ message: err.message });
        } else {
            res
                .status(statusCodes.success)
                .json(
                    `User error: no blog post with specified id found. (id: ${id})`
                );
        }
    });
});

module.exports = blogRouter;
