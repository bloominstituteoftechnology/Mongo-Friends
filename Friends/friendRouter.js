const router = require('express').Router();
const Friend = require('./friendModel');


router
    .route('/')
    .get((req, res) => {
        Friend.find()
            .then(friendsArray => {
                res.status(200).json({ friendsArray });
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
            })
    })
    .post((req, res) => {
        const friendData = req.body;

        const friend = new Friend(friendData);

        if(!friendData.firstName || !friendData.lastName || !friendData.age) {

            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
        } if (isNaN(friendData.age) || friendData.age < 1 || friendData.age > 120 ) {

            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
        } else {

            friend.save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                  res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
            })
        }
    });

    router
        .route('/:id')
        .get((req, res) => {
            const { id } = req.params;

            Friend.findById(id)
                .then(friend => {
                    if(!friend) {
                        res.status(404).json({ message: "The friend with the specified ID does not exist." })
                    } else {
                        res.json(friend);
                    }
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: "The friend information could not be retrieved." })
                })
        })
        .delete((req, res) => {
            const { id } = req.params;
            Friend.findByIdAndRemove(id)
                .then(friend => {
                    if(friend === null) {
                        res.status(404).json( { message: "The friend with the specified ID does not exist." });
                    } else {
                        res.status(200).json(friend);
                    }
                })
                .catch(err => {
                    res.status(500).json({ errorMessage: "The friend could not be removed" });
                })
        })
        .put((req, res) => {
            const { id } = req.params;
            const friendData = req.body;

            Friend.findByIdAndUpdate(id, friendData)
                .then(updatedFriend => {
                    res.status(200).json(updatedFriend);
                })
                .catch(err => {
                    res.status(500).json(err);
                })
        });






module.exports = router;
