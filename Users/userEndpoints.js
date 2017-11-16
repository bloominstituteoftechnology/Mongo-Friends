const User = require('./UserModel.js');
const httpCodes = require('../Common/statusCodes.js');

module.exports = function(server) {

  server.post('/api/users', function(req, res) {
    const newUser = new User(req.body);

    // check the user has all the data    ---  where does it check???
    newUser.save(function(err, user) {
      if (err) {
        res.status(httpCodes.userError).json({error: "Something unbearable happened; could not create the user."});
      } else {
        res.status(httpCodes.okay).json(user);
      }
    });
  });

  server.get('/api/users', function(req, res) {
    User.find({}, function(err, users) {
      if (err) {
        res.status(httpCodes.userError).json({error: "Could not display all users."});
      } else {
        res.status(httpCodes.okay).json(users);
      }
    });
  });

  server.get('/api/users/:id', function(req, res) {
    const { id } = req.params;

    User.findById(id, function(err, users) {
      if (err) {
        res.status(httpCodes.userError).json({error: "Could not find user to delete."});
      } else {
        res.status(httpCodes.okay).json(users);
      }
    });
  });

  server.delete('/api/users/:id', function(req, res) {
    const { id } = req.params;

    User.findByIdAndRemove(id, function(err, users) {
      if (err) {
        res.status(httpCodes.userError).json({error: "Could not find user to delete."});
      } else {
        res.status(httpCodes.okay).json(users);
      }
    });
  });
};