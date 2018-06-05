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
            res.status(400).json({ error: "Please provide a first name, last name and age for your friend" });
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