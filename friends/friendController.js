const router = require('express').Router();

const Friend = require('./friendModel');

router  
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({ error: "The friend infromation could not be retrieved" })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        if(!firstName || !lastName || !age){
            res.status(400).json({ error: "Please provide a first name, last name and age for the friend" });
            return;
        }
        if(isNaN(age) == true || age < 1 || age > 120 ){
            res.status(400).json({ error: "Age must be a number between 1 and 120" });
            return;
        }
        newFriend
            .save()
            .then(savedFriend => {
                res.status(201).json(newFriend);
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error saving the friend to the database" })
            })
    });

router
    .route('/:id')
    .get((req, res) => {
        Friend
            .findById(req.params.id)
            .then(friend => {
                if(!friend){
                    res.status(404).json({ error: "The friend with the specified ID does not exist." })
                } else{
                    res.status(200).json(friend);
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The friend information could not be retrieved." })
            })
    })
    .delete((req, res) => {
        Friend
            .findByIdAndRemove(req.params.id)
            .then(friend => {
                if(friend){
                    res.status(200).json({ success: `Friend with id ${req.params.id} has been removed from the database.`})
                } else{
                    res.status(404).json({ error: "The friend with the specified ID does not exist." })
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The friend could not be removed" })
            })
    })
    .put((req, res) => {
        const { firstName, lastName, age } = req.body;
        if(!firstName || !lastName || !age){
            res.status(400).json({ error: "Please provide a first name, last name and age for the friend" });
            return;
        }
        if(isNaN(age) == true || age < 1 || age > 120 ){
            res.status(400).json({ error: "Age must be a number between 1 and 120" });
            return;
        }
        Friend
            .findByIdAndUpdate(req.params.id, { firstName, lastName, age })
            .then(friend => {
                if(!friend){
                    res.status(404).json({ error: "The friend with the specified ID does not exist." })
                } else {
                    res.status(200).json(friend);
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The friend information could not be modified." })
            })
    })

module.exports = router;