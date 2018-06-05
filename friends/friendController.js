const router = require('express').Router(); //declares that all routes for this address will be found on this router.
const Friends = require('./friendModel'); // Here we're pulling in our friendModel

// https://www.cheatography.com/kstep/cheat-sheets/http-status-codes/ 

router
    .route('/')
    .get((req, res) => {
        Friends.find() //This will find all the resources at that model.
        .then(friends => {
            res.json(friends);
        })
        .catch(err => {
            res.status(500).json({error: 'The friends information could not be retrieved.'});
        })
    })
    .post((req, res) => {
        const { firstName, lastName, age, createdOn} = req.body;
        const newFriend = new Friends ({ firstName, lastName, age, createdOn});
        newFriend
            .save() // this will 'insert' a document into the Friend collection
            .then(friend => {
                console.log(friend);
                res.status(201).json(friend); //201: created 
            })
            .catch(err => {
                res.status(422).json({error: err}) //422: Unproc­essable Entity
            })
    })

module.exports = router; 

