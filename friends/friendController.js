const router = require('express').Router();

const Friend =  require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friend
            .find({})
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => res.status(500).json({ errorMessage: "The friends information could not be retrieved." }))
    })
    .post((req, res) => {
        const friend = new Friend(req.body);

        if (!friend.firstName || !friend.lastName || !friend.age) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
            return;
        }

        if (typeof(friend.age) !== 'number' || friend.age > 120) {
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
            return;
        }

        friend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => res.status(500).json(err));
    })

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;

        Friend
            .findById(id)
            .then(friend => {
                if(friend === null) {
                    res.status(404).json({ message: "The friend with the specified ID does not exist." });
                    return;
                }
                res.status(200).json(friend);
            })
            .catch(err => res.status(500).json(err.message))
    })
    .put((req, res) => {
        const update = { ...req.body };
        const { id } = req.params;

        if(!update.firstName || !update.lastName || !update.age) {
            res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
            return;
        }

        if(update.age && typeof(update.age) !== 'number' || update.age > 120) {
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" });
            return;
        }

        Friend
            .findById(id)
            .then(friend => {
                if (friend === null) {
                    res.status(404).json({ message: "The friend with the specified ID does not exist." })
                    return;
                }

                Friend
                    .findByIdAndUpdate(id, update)
                    .then(response => {
                        Friend
                            .findById(id)
                            .then(friend => res.status(200).json(friend));
                    })
                    .catch(err => res.json(500).json(err));
            }).catch(err => res.status(500).json(err));

        
    })
    .delete((req, res) => {
        const { id } = req.params;

            Friend
                .findById(id)
                .then(friend => {
                    const target = friend; 

                    if(friend === null) {
                        res.status(404).json({ message: "The friend with the specified ID does not exist." });
                        return;
                    }

                    Friend
                        .remove(friend)
                        .then(response => {
                            res.status(200).json(response);
                        })
                        .catch(err => res.status(500).json({ errorMessage: "The friend could not be removed" }));

                })
                .catch(err => res.status(500).json({ errorMessage: "The friend could not be removed" }));
    })


module.exports = router;