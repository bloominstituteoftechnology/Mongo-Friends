const express = require('express');

const Friends = require('./friendsModels.js');

const friendsRouter = express.Router();


friendsRouter.post('/', (req, res) => {
    const friendInfo = req.body;
    const friend = new Friends(friendInfo);

    if (!friendInfo.firstName || !friendInfo.lastName || !friendInfo.age) {
        res.status(400).json({ errorMessage: `Please provide firstName, lastName and age for the friend.` });
    }
    if (!parseInt(friendInfo.age)  || friendInfo.age < 1 || friendInfo.age > 120) {
        res.status(400).json({ errorMessage: `Age must be a whole number between 1 and 120` });
    }
        friend
        .save()
        .then(newFriend => {
            res.status(201).json(newFriend);
        })
        .catch(err => {
            res.status(500).json({ error: `There was an error while saving the friend to the database` });
        })

});

friendsRouter.get('/', (req, res) => {
    Friends.find({})
    .then(friends => {
        console.log('Friends retrieved.')
        res.status(200).json(friends);
    })
    .catch(err => {
        res.status(500).json({ error: "The information could not be retrieved." })
    })
});

friendsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    Friends.findById(id)
    .then(newFriend => {
        if (!newFriend) {
            res.status(404).json({ message: "The friend with the specified ID does not exist." });
        }
        res.status(200).json(newFriend);
    })
    .catch(err => {
        res.status(500).json({ error: "The information could not be retrieved." });
    })
});

friendsRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    Friends.findByIdAndRemove(id)
    
    .then(friend => {
        if (!friend) {
            res.status(404).json({ message: "The friend with the specified ID does not exist." });
        }
        res.status(200).json(friend);
    })
    .catch(err => {
        res.status(500).status({ error: "The friend could not be removed" });
    });
});

friendsRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const friendInfo = req.body;

    Friends.findByIdAndUpdate(id, friendInfo)

    .then(friend => {
        if (!friend) {
            res.status(404).json({ message: "The friend with the specified ID does not exist." });
        }
        res.status(200).json(friend);
    })
    .catch(err => {
        res.status(500).json({ error: "The friend information could not be modified." });
    });
});

module.exports = friendsRouter;