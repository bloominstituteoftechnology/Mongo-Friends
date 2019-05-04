const router = require('express').Router();

const Friend = require('./friendModel');

// /api/friends
router
    .route('/')
    .get((req, res) => {
        Friend.find({})
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "The friends information could not be retrieved." });
            });
    })
    .post((req, res) => {
        const friend = new Friend(req.body);

        friend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                if (err.name === 'ValidationError')
                    res.status(400).json(err.message);
                else    
                    res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
            });
    });        
router
    .route('/:id')
    .get((req, res) => {
        Friend.findById(req.params.id)
            .then(friend => {
                if (!friend)
                    res.status(400).json({ message: "The friend with the specified ID does not exist." });
                else
                    res.status(200).json(friend);
            })
            .catch(err => {
                if (err.name === "CastError")
                    res.status(400).json(`${err.value} is not a valid id`);
                else
                    res.status(500).json({ errorMessage: "The friend information could not be retrieved." });
            });
    })
    .delete((req, res) => {
        Friend.findByIdAndRemove(req.params.id)
            .then(friend => {
                if (!friend)
                    res.status(404).json({ message: "The friend with the specified ID does not exist." });
                else
                    res.status(200).json(friend);
            })
            .catch(err => {
                if (err.name === 'CastError')
                    res.status(400).json({error: 'The specified id was not valid.'})
                else
                    res.status(500).json({ errorMessage: "The friend could not be removed" });
            });
    })
    .put((req, res) => {
        const {age} = req.body;

        if (age < 1 || age > 120 ) {
            res.json({ errorMessage: "Age must be a number between 1 and 120" });
        } else {
            Friend.findByIdAndUpdate(req.params.id, req.body)
                .then(friend => {
                    if (!friend)
                        res.status(404).json({ message: "The friend with the specified ID does not exist." });
                    else {
                    const { age, firstName, lastName } = friend; 
                    const updatedFriend = { age, firstName, lastName, ...req.body};
                    res.status(200).json(updatedFriend);
                    };
                })
                .catch(err => {
                    if (err.name === 'CastError')
                        res.status(400).json({ errorMessage: "Please provide updated information" });
                    else
                        res.status(500).json({ errorMessage: "The friend information could not be modified." });
                })
        }   
    });

    module.exports = router;