const express = require('express');

const Friend = require('./FriendModel.js');

const friendsRouter = express.Router();

// /api/friends
friendsRouter.post('/', function(req, res) {
    const friendFields = req.body;
    console.log(friendFields);
    const friend = new Friend(friendFields);
    friend
    .save()
    .then(savedFriend => {
        if (!friendFields.firstName || !friendFields.lastName || !friendFields.age) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
        } else if (friendFields.age < 1 || friendFields.age > 120) {
                res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
        }
        res.status(201).json(savedFriend);
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the friend to the database" });
    });
});

friendsRouter.get('/', function(req, res) {
    Friend.find({})
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

friendsRouter.get('/:id', function(req, res) {
    const { id } = req.params;
    Friend.findById(id, (err, friend)=> {
        if (!friend) res.status(404).json({ message: "The friend with the specified ID does not exist." });
        })
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(err => {
      res.status(500).json({ error: "The information could not be retrieved." });
    });
});

friendsRouter.get('/:id', function(req, res) {
    const { id } = req.params;
    Friend.findById(id, (err, friend)=> {
        if (!friend) res.status(404).json({ message: "The friend with the specified ID does not exist." });
        if (err) res.status(500).json({ error: "The information could not be retrieved." });
        res.status(200).json(friend);
    });
});

friendsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id, (err, deletedFriend) => {
        if (!deletedFriend) res.status(404).json({ message: "The friend with the specified ID does not exist." });
        if (err) res.status(500).json({ error: "The friend could not be removed" });
        res.status(200).json(deletedFriend);
    });
});

friendsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const friendFields = req.body;
    Friend.findByIdAndUpdate(id, friendFields, {new: true}, (err, updatedFriend) => {
        if (!updatedFriend) res.status(404).json({ message: "The friend with the specified ID does not exist." });
        if (!friendFields.firstName || !friendFields.lastName || !friendFields.age) res.status(404).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
        if (friendFields.age < 1 || friendFields.age > 120) res.status(404).json({ errorMessage: "Age must be a whole number between 1 and 120"});
        if (err) res.status(500).json({ error: "The friend information could not be modified." });
        res.status(200).json(updatedFriend);
    });
});

module.exports = friendsRouter;
