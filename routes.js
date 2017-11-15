const User = require('./UserModel.js');
const STATUS_SUCCESS = 200;
const STATUS_CREATE_SUCCESS = 201;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

module.exports = function(server) {
    server.get('/api/users', function(req, res) {
        User.find({}, (err, users) => {
            if (err) {
              res.status(STATUS_SERVER_ERROR).json({ error: err });
            } else {
              res.status(STATUS_SUCCESS).json(users);
            }
        });
    });
    
    server.get('/api/users/:id', (req, res) => {
        const { id } = req.params;
        User.findById(id, (err, user) => {
          if (err) {
            res.status(STATUS_SERVER_ERROR).json({ error: err });
          } else {
            res.status(200).json(user);
          }
        });
      
    });
    
    server.post('/api/users', (req, res) => {
        const userData = req.body;
        if (!userData.username || !userData.age) {
            res.status(STATUS_USER_ERROR).json({ error: "Properties username and age are required"})
        }
        if (typeof userData.age !== 'number') {
            res.status(STATUS_USER_ERROR).json({ error: "Age must be a type of number"});
        }
        const newUser = new User(userData);
        
        newUser.save((err, user) => {
          if (err) {
            res.status(STATUS_SERVER_ERROR).json({ error: err });
          } else {
            res.status(STATUS_CREATE_SUCCESS).json(user);
          }
        });
    });
    
    server.delete('/api/users/:id', (req, res) => {
        const { id } = req.params;
        
        User.deleteOne({_id: id}, (err, user) => {
          if (err) {
            res.status(STATUS_SERVER_ERROR).json({ error: "User not found" });
          } else {
            res.status(STATUS_SUCCESS).json({success: "User was successfully removed" });
          }
        });
      
    });
}