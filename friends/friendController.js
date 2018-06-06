const router = require('express').Router();

const Friend = require('./friendModel');

router
    .route('/')
    .get((req, res) => {
        Friend
            .find()
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({ error: 'The friends information could not be retrieved.' })
            })
    })
    .post((req, res) => {
        const { firstName, lastName, age } = req.body;
        const newFriend = new Friend ({ firstName, lastName, age });
        if (!firstName || !lastName || !age) {
            res.status(404).json({ error: `Please provide friend's first name, last name, aand age.` });
            return;
        }
        newFriend
            .save()
            .then(response => {
                console.log(response);
                res.status(201).json({ success: 'New friend created.' });
            })
            .catch(err => {
                res.status(500).json({ error: 'There was an error while saving the friend to the database.' })
            });
      });

router
      .route('/:id')
      .get((req, res) => {
          const { id } = req.params;
          Friend
            .findById(id)
            .then(response => {
                res.status(200).json(response);
            })
            .catch(err => {
                res.status(404).json({ error: 'The friend with the specified ID does not exist.' });
            });
      })
      .delete((req, res) => {
          const { id } = req.params;
          Friend 
            .findByIdAndRemove(id)
            .then(response => {
                if (response == 0) {
                    res.status(404).json({ error: 'he friend with the specified ID does not exist.' });
                    return;
                }
                res.json({ success: 'Friend removed from database.' });
            })
            .catch(err => {
                res.status(500).json({ error: 'The friend could not be removed.' });
            });
      })
      .put((req, res) => {
          const { id } = req.params;
          const { firstName, lastName, age } = req.body;
          const updatedFriend = { firstName, lastName, age };
          if (!firstName || !lastName || !age) {
            res.status(400).json({ error: 'Please provide first name, last name, and age for the friend.' });
            return;
          }
          Friend
            .findByIdAndUpdate(id, updatedFriend)
            .then(response => {
                res.json(response);
            })
            .catch(err => {
                res.status(500).json({ error: 'The friend information could not be modified.' })
            });
});

module.exports = router;