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
            res.status(400).json({errorMessage: "Please provide first name, last name, and age."})
        } else if(age < 1 || age > 120){
            res.status(400).json({errorMessage: "Age must be a number between 1 and 120"})
        }
        newFriend
        .save()
        .then(savedFriend => {
            res.status(201).json(savedFriend)
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
                res.status(404).json({error: "The friend with the specified ID does not exist."})
                return;
            } else {
                console.log(friend.id.length);
                res.status(200).json(friend);
            }
        })
        .catch(err => {
            res.status(500).json({error: 'The friend information could not be retrieved.'})
        })
    })
    .delete((req, res) => {
        const {id} = req.params;
        if (id.length !== 24 || typeof id === String || typeof id === Number){
            res.status(400).send({error: "IDs need to be 24 chars long."})
            return;
        }
        Friend.findByIdAndRemove(id)
        .then(response => {res.status(200).json(response)})
        .catch(err => {res.status(500).json({ errorMessage: "The friend could not be removed" })});
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
        } else if(age < 1 || age > 120){
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120." })
        } else {
            Friend.findByIdAndUpdate(id, friend)
            .then(friend => {res.status(200).json(friend)})
            .catch(err => {res.status(500).json({ errorMessage: "The friend information could not be modified." })})
        }
    });
module.exports = router;