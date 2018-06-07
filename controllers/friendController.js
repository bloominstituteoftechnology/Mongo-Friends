const router = require('express').Router();

const Friend = require('../models/friend');

router
    .route('/')
    .get((req, res) => {
       Friend.find()
        .then(friends => {
            res.status(200).json(friends);
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
                res.status(201).json({ savedFriend });
            })
            .catch(error => {
                console.log(error)
                res.status(422).json({ errorMessage: error.message });
            });
    });

router
    .route('/:id')
    .get((req, res) => {
        console.log('req.params', req.params)
        const { id } = req.params;
        Friend.findById(id)
            .then(friend => {
                if (friend === null) {
                    res.status(404).json({ error: 'You don\'t have a friend at least in DB'})
                }
                res.status(200).json(friend);
            })
            .catch((() => {
                res.status(500).json({
                    errorMessage: "The friend information could not be retrieved."
                })
            }))
    })

    .delete((req, res) => {
        const { id } = req.params;
        Friend.findByIdAndRemove(id)
            .then(removeFriend => {
                console.log('exterminatedFriend', removeFriend);
                if (removeFriend === null) {
                    res.status(404).json({ error: 'No friend found in DB to exterminate' });
                } 
                res.status(200).json({ success: `Friend exterminated. Qapla!`, resources: exterminatedFriend })
                return;
            })
            .catch(err => res.status(500).json( err ))
    })

    .put((req, res) => {
        const { id } = req.params;
        const update = ({ firstName, lastName, age } = req.body);
        console.log('put update', update);  

        Friend.findByIdAndUpdate(id, update, {new: true})
            .then(friendUpdated => {
                console.log('friendUpdated', friendUpdated)
                if (friendUpdated === null) {
                    res.status(404).json({ error: 'No friend found in DB to exterminate'});
                    return;                    
                }
                Friend.find()
                    .then(friends => {
                        res.status(200).json({ friends })
                    })
                    .catch(err => {
                        res.status(500).json({ err })
                    })
                // res.status(200).json({
                //     success: 'Updated the friend',
                //     resource: friendUpdated
                // })
            })
            .catch(err => res.status(500).json({ err }));
    });

    module.exports = router;