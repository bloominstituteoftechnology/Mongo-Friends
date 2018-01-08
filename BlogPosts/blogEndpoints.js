const BlogPost = require('./BlogPostModel.js');
const httpCodes = require('../Common/statusCodes.js');

module.exports = function(server) {

  server.post('/api/blogposts', function(req, res) {
    const newBlogPost = new BlogPost(req.body);

    newBlogPost.save(function(err, blogpost) {
      if (err) {
        res.status(httpCodes.userError).json({error: "Could not create new blog post."});
      } else {
        res.status(httpCodes.success).json(blogpost);
      }
    });
  });

  server.get('/api/blogposts', function(req, res) {
    BlogPost.find({}, function(err, blogposts) {
      if (err) {
        res.status(httpCodes.userError).json({error: "Could not retrieve all blog posts."});
      } else {
        res.status(httpCodes.success).json(blogposts);
      }
    });
  });

  server.get('/api/blogposts/:id', function(req, res) {
    const { id } = req.params;

    BlogPost.findById(id, function(err, blogposts) {
      if (err) {
        res.status(httpCodes.userError).json({error: "Could not retrieve the specified user"});
      } else {
        res.status(httpCodes.success).json(blogposts);
      }
    });
  });

  server.delete('/api/blogposts/:id', function(req, res) {
    const { id } = req.params;

    BlogPost.findByIdAndRemove(id, function(err, blogpost) {
      if (err) {
        res.status(httpCodes.userError).json({message: err.message});
      } else if (user !== null) {
        res.status(httpCodes.success).json(`Success! Blog Post ${id} removed.`);
      } else {
        res.status(httpCodes.userError).json(`User error: no blog post with specified id found. (id: ${id})`);
      }
    });
  });
};