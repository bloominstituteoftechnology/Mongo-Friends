const router = require('express').Router();

const Friend = require('./FriendModel');

function error(params) {

}

router
.route('/')
.get(get)
.post(post);

const msgNotFound = {
    message: "Your friend with the specified ID does not exist, we hope they dont disappear in real life like this."
}

const msgNotExists = {
    message: "Looking for ghosts? Your friend does not exist on our database, we hope your friend exists in yours"
}

router
    .route('/:id')
    .get((req, res) => {
        const objId = req.params.id;
        Friend.findById(objId)
            .then(friend => {
                if (friend) {
                    res.status(201).json({ friend })
                } else {
                    return res.status(404).json(msgNotExists)
                }
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Your friend's information could not be retrieved, try again later."})
            })
    })
    .delete((req, res) => {
        const objId = req.params.id;
        Friend.findByIdAndDelete(objId)
            .then(deleted => {
                if (deleted) {
                    res.status(201).json({ message: "You've dropped a friend! We hope it's because you found better ones. Add a new friend now! ", objId })
                } else {
                    return res.status(404).json(msgNotExists)
                }
            })
            .catch(err => {
                res.status(500).json({
                    errorMessage: "The friend could not be removed, if that friend really sucks, please try again later!"
                })
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const updatedFriend = req.body;
        Friend.findByIdAndUpdate(id, updatedFriend)
            .then((updated => {
                if (updated) {
                    res.status(200).json({ updatedFriend })

                } else {
                    return res.status(404).json(msgNotExists)
                }
            }))
            .catch(err => {
                res.status(500).json({
                    errorMessage: "Your friend could not be updated"
                })
            })
    })


function get(req, res) {
    Friend.find().then( friends => {
        res.status(200).json(friends);
    })
    .catch(err => {0
        res.status(500).json({ message: "Friends could not be retrieved"});
    })
}

function post(req, res) {
    const friendData = req.body;
    const friend = new Friend(friendData);

     
    if (friendData.age > 120 || friendData.age < 1) {
        return res.status(400).json({
            errorMessage: "Your friend is either too young or too old for you. Age must be a number between 1 and 120!"
        })
    }
    if (!friendData.firstName || !friendData.lastName || !friendData.age) {
        return res.status(400).json({ errorMessage: "Please provide the name, last name, and age for the homie." })
    } 
    friend
        .save().then(friend => {
            res.status(201).json(friend)
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "I hope you're better than us at saving your friend. There was an error saving your friend to the database.", err });
        });
}

module.exports = router;