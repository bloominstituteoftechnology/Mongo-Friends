const User = require('./UserSchema.js');
const httpCodes = require('../Common/httpcodes.js');

module.exports = function(server) {
server.get('/api/users', function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            res.status(httpCodes.serverError).json({ error: 'Cannot get users'})
        } else {
            res.status(200).json(users)
        }
    });
});

server.get('/api/users/:id', function(req, res) {
    const { id } = req.params;

    User.findById(id, function(err, users) {
        if(err) {
            res.status(httpCodes.serverError).json({ error: 'Cannot get user with that ID'})
        } else {
            res.status(200).json(users)
        }
    });
});

server.post('/api/users', function(req, res) {
    const newUser = new User(req.body);
    
    newUser.save(function(err, user) {
        if(err) {
            res.status(httpCodes.serverError).json({ error: 'Cannot save user'})
        } else {
            res.status(200).json(user)
        }
    });
});

server.delete('/api/users/:id', function(req, res) {
    const { id } = req.params;
    
    User.remove({ "_id": id }, function(err, user) {
        if(err) {
            res.status(httpCodes.serverError).json({ error: 'Cannot delete user'})
        } else {
            res.status(200).json(true)
        }
    });
});
}