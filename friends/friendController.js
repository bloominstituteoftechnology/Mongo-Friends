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
                res.status(500).json({error: 'There was an error getting friends list'});
            });
    })
    .post((req, res) => {
        const friend = new Friend(req.body);

        friend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => res.status(500).json(err.message));
    });

router
    .route('/:id')
    .get((req, res) => {
        Friend.findById(req.params.id)
            .then(friend => {
                res.status(200).json(friend);
            })
            .catch(err => {
                if (err.name === "CastError")
                    res.status(404).json(`${err.value} is not a valid id`);
                else
                    res.status(500).json({error: "There was a server error"});
            });
    })
    .delete((req, res) => {
        Friend.findByIdAndRemove(req.params.id)
            .then(friend => {
                res.status(200).json(friend);
            })
            .catch(err => {
                if (err.name === 'CastError')
                    res.status(404).json(err.message)
                else
                    res.status(500).json(err);
            })
    })
    .put((req, res) => {
        const {age} = req.body;
        if (age < 1 || age > 120 ) {
            res.json({error: 'Age must be between 1 and 120'});
        } else {
        Friend.findByIdAndUpdate(req.params.id,req.body)
            .then(friend => {
                const { age, firstName, lastName } = friend; 
                const updatedFriend = { age, firstName, lastName, ...req.body};
                res.status(200).json(updatedFriend);
            })
            .catch(err => {
                if (err.name === 'CastError')
                    res.status(504).json(err.message);
                else
                    res.status(500).json(err.message);
            })
        }
    })

    module.exports = router;