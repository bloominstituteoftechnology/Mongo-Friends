const router = require('express').Router();

const Friend = require('./friendsModel');

router
    .route('/')
    .get((req, res) => {
        Friend
        .find()
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => res.status(500).json({error: "There was an error fetching the data."}));
    })
    .post((req, res) => {
        const {firstName, lastName, age} = req.body;
        const newFriend = new Friend ({firstName, lastName, age});
        if(!firstName || !lastName || !age){
            res.status(400).json({error: "Please provide first name, last name, and age."})
        }
        newFriend
        .save()
        .then(savedFriend => {
            res.status(200).json(savedFriend)
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving to the db."})
        });
    })

router
    .route('/:id')
    .get((req, res) => {
        const {id} = req.parms;
        if(id.length !== 24 || typeof id === String || typeof id === Number){
            res.status(400).json({error: "IDs need to be 24 chars long."})
            }
        Friend.findById(id)
        .then(friend => {
            if (friend === null){
                res.status(404).json({error: "ID cannot be found."})
                return;
            } else {
                console.log(friend.id.length);
                res.status(200).json(friend);
            }
        })
        .catch(err => {
            res.status(500).json({error: 'Something has gone wrong, please try again.'})
        })
    })
    .delete((req, res) => {
        const {id} = req.params;
        if (id.length !== 24 || typeof id === String || typeof id === Number){
            res.status(400).send({error: "Something has gone wrong, please try again."})
            return;
        }
        Friend.findByIdAndRemove(id)
        .then(response => {res.status(200).json(response)})
        .catch(err => {res.status(500).json({error: "Something has gone wrong, please try again."})});
    })
    .put((req, res) => {
        const {id} = req.params;
        console.log(id);
        const {firstName, lastName, age} = req.body;
        const friend = {firstName, lastName, age};
        console.log(id);
        console.log(friend);
        if(id.length !== 24 || typeof id === String || typeof id === Number){
            res.status(400).json({error: "The ID you have entered is in an incorrect format."})
        } else {
            Friend.findByIdAndUpdate(id, friend)
            .then(friend => {res.status(200).json(friend)})
            .catch(err => {res.status(404).json({error: "No friend has this ID in the db."})})
        }
    });
module.exports = router;