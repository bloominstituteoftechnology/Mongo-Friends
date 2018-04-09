const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {

        Friend  
            .find({})
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({ err: "Friends list could not be found."});
            })
    })

    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const friend = new Friend(req.body);

        if (!firstName || !lastName || !age) {
            res.status(400).json({ errMsg: "Please provide firstName, lastName, and age for the friend." })
        } else {

            friend

              .save()
              .then(savedFriend => {
                res.status(201).json(savedFriend);
              })
              .catch(err => {
                res.status(500).json({ err: "There was an error while saving the friend to the database." })
            })
        }    
    })

router 
    .route('/:id')
    .get((req, res) => {

        Friend
            .findById(req.params.id)
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                if (res.status(404)) {
                    res.json({ errMsg: "The friend with the specified ID does not exist." });
                } else {
                    res.status(500).json({ errMsg: "${firstName} ${lastName}'s information could not be retrieved.." });
                }   
            })
    })

    .delete((req, res) => {

        Friend
            .findByIdAndRemove(req.params.id)
            .then(() => {
                res.json({ msg: "${firstName} ${lastName} was successfully removed from the list." });
            })
            .catch(err => {
                if (res.status(404)) {
                    res.json({ errMsg: "The friend with the specified ID does not exist." });
                } else {
                    res.status(500).json({ errMsg: "${name} could not be removed." });
                }
            })
    })

    .put((req, res) => {
        const { firstName, lastName, age } = req.body;
        
        if (!firstName || !lastName || !age) {
            res.status(400).json({ errMsg: "Please provide firstName, lastName and age for the friend." });
        } else {
            
            Friend
                .findByIdAndUpdate(req.params.id, req.body)
                .then(updatedFriend => {
                    res.status(201).json(updatedFriend);
                })
                .catch(err => {
                    res.status(500).json({ errMsg: "${firstName} ${lastName}'s could not be modified." })
                })
        }
        
    })

module.exports = router;