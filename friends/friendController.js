const router = require('express').Router();
const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friend.find({})
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .post((req, res) => {
        const friend = new Friend(req.body);

        friend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => res.status(500).json(err));

    });

router
    .route('/:id')
    .get((req, res)=> {
        Friend.findById(req.params.id)
        .then(friends => {
            res.status(200).json(friends);
        })
        .catch(err => {
            res.status(500).json(console.error('Error getting frined',err));
        });
    })

    .delete((req, res) => {
        const { id } = req.params
        Friend.findByIdAndRemove(id)
        .then(removed => {
            if(removed === null){
                res.status(404).json({ message: 'not found'})
            } else {
            res.status(200).json(removed)
            }
        })
        .catch(err => {
            res.status(500).json(console.error("Error deleting", error))
        })
    })

    .put((req, res)=> {
        console.log(req.params.id)
        const { id } = req.params
        const friend = req.body
        
        Friend.findByIdAndUpdate(id, friend)
        .then(updated => {
            if (updated === null) {
                res.status(404).json(updated);
            } else {
                res.status(200).json(updated)
            }
        })
        .catch(err => {
            res.status(500).json("Error updating", err)
        })
    })

module.exports = router;
