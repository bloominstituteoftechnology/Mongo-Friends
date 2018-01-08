const User = require('./UserModel.js');                 // import the UserSchema
const httpCodes = require('../Common/statusCodes.js');  // import HTTP status codes collection

module.exports = function(server) {                     // receive the server for use in routing && export routing functionality

  server.post('/api/users', function(req, res) {        // define POST routing to create a user through /api/users
    const newUser = new User(req.body);                 // define 'newUser' as a new 'User' object && assign it data from the body of the post request

    newUser.save(function(err, user) {                  // verify that new user data has all data required by schema
      if (err) {                                        // if any required user data is missing
        res.status(httpCodes.userError).json({error: "User error: Insufficient data supplied to create user; must include username, fullName, password."}); // return 422 && error message
      } else {                                          // else all needed data was received, save
        res.status(httpCodes.success).json(`Success! ${user.fullName} added to users database.`);
      }
    });
  });

  server.get('/api/users', function(req, res) {         // define GET routing to retrieve all users through /api/users
    User.find({}, function(err, users) {                // find all users at /api/users endpoint
      if (err) {                                        // if server cannot get users
        res.status(httpCodes.serverError).json({error: "Server error: Could not display all users."});  //return 500 && error message
      } else {                                          // if server did get users
        res.status(httpCodes.success).json(users);      // return 200 && all users
      }
    });
  });

  server.get('/api/users/:id', function(req, res) {     // define GET routing to retrieve a specific user through /api/users
    const { id } = req.params;                          // initialize id with the id contained in request parameters

    User.findById(id, function(err, user) {             // use the id to search the 'users' db
      if (err) {                                        // if specified id is not found in 'users' db
        res.status(httpCodes.userError).json({error: "User error: could not find specified user."});  // return 422
      } else {                                          // server did find the id
        res.status(httpCodes.success).json(user);       // return 200 && specified user's data
      }
    });
  });

  server.delete('/api/users/:id', function(req, res) {  // define DELETE routing to remove a specific user through /api/users
    const { id } = req.params;                          // initialize id with the id contained in request parameters

    User.findByIdAndRemove(id, function(err, user) {    // use the id to find and remove specified user from 'users' db
      if (err) {                                        // if specified id is not found in users db
        res.status(httpCodes.userError).json({message: err.message});  // return status 422 && actual error message (malformed/invalid user id received)
      } else if (user !== null) {
        res.status(httpCodes.success).json(`Success! ${user.fullName} removed from users database.`);  // return status 200 && successful deletion message
      } else {
        res.status(httpCodes.userError).json(`User error: no user with specified id found. (id: ${id})`); // return status 422 && user error message (valid id format, but not found)
      }
    });
  });
};