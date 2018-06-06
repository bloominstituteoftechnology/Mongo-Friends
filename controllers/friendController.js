const router = require('express').Router();

const Friend = require('../models/friend');

router
    .route('/')
    .get((req, res) => {
       Friend.find()
        .then(friend => {
            res.status(200).json(friend);
        })
        .catch(err => res.status(500).json({error: 'Error fetching friends'}))
    })

    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend({ firstName, lastName, age });
        console.log(newFriend);
        newFriend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                res.status(422).json({ error: 'Error saving friends'});
            });
    });

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend.findById(id)
            .then(foundFriend => {
                if (foundFriend === null) {
                    res.status(404).json({ error: 'You don\'t have a friend at least in DB'});
                };
            });
    })

    .delete((req, res) => {
        const { id } = req.params;
        Friend.findByIdAndRemove(id)
            .then(removeFriend => {
                console.log(exterminatedFriend);
                if (exterminatedFriend === null) {
                    res.status(404).json({ error: 'No friend found in DB to exterminate'});
                    return;
                }
                res.json({ success: `Friend exterminated. Qapla!`, resources: exterminatedFriend})
            })
            .catch(err => res.status(500).json({ error: err}));
    })

    .put((req, res) => {
        const { id } = req.params;
        const update = ({ firstName, lastName, age } = req.body);
        Friend.findByIdAndUpdate(id, update, {new: true})
            .then(friendUpdated => {
                if (friendUpdated === null) {
                    res.status(404).json({ error: 'No friend found in DB to exterminate'});
                    return;                    
                }
                res.json({ success: 'Updated the friend', resource:friendUpdated});
            })
            .catch(err => res.status(500).json({ error: err }));
    });

    module.exports = router;