const Post = require('./PostSchema.js');
const httpCodes = require ('../Common/httpcodes.js');

module.exports = function(server) {
    server.get('/api/posts', function(req, res) {
        Post.find({}, function(err, posts) {
            if(err) {
                res.status(httpCodes.serverError).json({ error: 'Cannot get posts'})
            } else {
                res.status(200).json(posts)
            }
        });
    });
    
    server.get('/api/posts/:id', function(req, res) {
        const { id } = req.params;
    
        Post.findById(id, function(err, posts) {
            if(err) {
                res.status(httpCodes.serverError).json({ error: 'Cannot get post with that ID'})
            } else {
                res.status(200).json(posts)
            }
        });
    });
    
    server.post('/api/posts', function(req, res) {
        const newPost = new Post(req.body);
        
        newPost.save(function(err, post) {
            if(err) {
                res.status(httpCodes.serverError).json({ error: 'Cannot save post'})
            } else {
                res.status(200).json(post)
            }
        });
    });
    
    server.delete('/api/posts/:id', function(req, res) {
        const { id } = req.params;
        
        Post.remove({ "_id": id }, function(err, post) {
            if(err) {
                res.status(httpCodes.serverError).json({ error: 'Cannot delete post'})
            } else {
                res.status(200).json(true)
            }
        });
    });
}