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
            
            console.log('body', req.body);
            
            const friend = new Friend(req.body);

            console.log('friend', friend);

            friend
                .save()
                .then(savedFriend => {
                    res.status(201).json(savedFriend);
                })
                .catch(err => res.status(500).json(err));
    });

router 
    .route('/:id')
    .get((req, res) => {
        Friend.findById(req.params.id)
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json(err);
            });
    })
    .delete((req, res) => {
        res.status(200).json({ status: 'Please delete.'});
    })
    .put((req, res) => {
        res.status(200).json({ status: 'Please put info.'});
    });

    
        

module.exports = router;