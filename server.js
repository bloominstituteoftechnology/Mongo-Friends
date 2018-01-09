const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./Users/UsersSchema.js');


const server = express();
server.use(bodyParser.json());

// create API endpoints
server.get("/users", (req, res) => {
    User.find({})
    .then(function(users) {
        res.status(200).json(users);
    })
    .catch(function() {
        res
            .status(500)
            .json({ error: "Unable to find users" });
    });
});

server.get("/users/:id", function(req, res) {
    const { id } = req.params;
    User.findById(id)
    .then(function(user) {
        res.status(200).json(user);    
    })
    .catch(function(error) {
        res
            .status(500)
            .json({ error: "User not found" });
    });
});

server.post("/users", (req, res) => {
    const userInfo = req.body;

    //check if data exists
    if (!userInfo.name) {
        res
            .status(400)
            .json({ error: "Name is required" });
    } else {
        const user = new User(userInfo);

        user.save() // returns a promise
            .then(function(newUser) {
                res.status(201).json(newUser);
            })
            .catch(function(error) {
                res
                    .status(500)
                    .json({ error: "Error while adding new user" });
            });
    }
})

server.delete("/users/:id", function(req, res) {
    const { id } = req.params;
    const removedUser = User.findById(id);
    User.findByIdAndRemove(id)
        .then(function(removedUser) {
            res.status(200).json({ message: "Removed user: " + removedUser });
        })
        .catch(function(error) {
            res
                .status(500)
                .json({ error: "Unable to find user" });
        });

});



// "plumbing", direction of db with Mongoose
mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost:27017/users')
    .then(function() {
        server.listen(5000, function() {
            console.log('Listening on port 5000');
        });
    })
    .catch(function(error) {
        console.log('Error thrown');
    });

