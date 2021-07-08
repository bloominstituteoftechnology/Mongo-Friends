const router = require('express').Router();
const Friend = require('./friendsModel');

router
    .route('/')
    .get(get)
    .post(post);

router
    .route('/:id')
    .get((req, res) => {
        res.status(200).json({ route: '/api/friends/' + req.params.id });
    })
    
    .delete((req, res) => {
        const id = req.params.id;

        Friend
          .findByIdAndRemove(id)
          .then(friends => {
            if (friends) {
                res.status(204).end();
            } else {
                res.status(404).json({message: "The friend with the specified ID does not exist." });
            }
          })
          .catch(err => {
                res.status(500).json({ errorMessage: "The friend could not be removed" });
          })
    })

    .put((req, res) => {
        const id = req.params.id;
        const update = req.body;

        const options = {
            new: true,
        };

        Friend
            .findByIdAndUpdate(id, update, options)
            .then(friends => {
                if (friends) {
                res.status(200).json(friends)
                } else {
                    res.status(404).json({ message: "The friend with the specified ID does not exist." });
                }
            })
            .catch(err => {
                if (err.kind === !firstName || !lastName || !age) {
                    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
                }
                res.status(500).json({ errorMessage: "The friend information could not be modified." });
            })
    })

    function get(req, res) {
        res.status(200).json({ route: 'api/friends' });
    }

    function post(req, res) {
        const friendData = req.body;

        const friend = new Friend(friendData);

        friend
            .save()
            .then(friend => {
                res.status(201).json(friend)
            })
            .catch(err => {
                res.status(500).json(err);
            });
    }

    module.exports = router;