const router = require('express').Router(); 

const Friend = require('./friendModel'); // pull in our Bear model

router
  .route('/')
  .get((req, res) => {
    Friend.find() // This will find ALL resources at that model.
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => res.status(500).json({ error: 'Error fetching friends' }));
  })
  .post((req, res) => {
    const { firstName, lastName, age } = req.body;
    if (!firstName || !lastName || !age) {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
        return;
    }
    if (typeof age !== 'number' || age > 120 || age < 1) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
        return;
    }
    const newFriend = new Friend({ firstName, lastName, age });
    newFriend
      .save() 
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Friend.findById(id) 
      .then(foundFriend => {
        res.status(200).json(foundFriend);
      })
      .catch(err => {
        res.status(404).json({ error: 'No friend by that id in DB' });
      });
  })
  .delete((req, res) => {
    const { id } = req.params
    Friend.findByIdAndRemove(id)
      .then(deletedFriend => {
        res.status(200).json(deletedFriend);
      })
      .catch(err => {
        res.status(404).json({ error: 'No friend by that id in DB' });
      });
  })
  .put((req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
      Friend.findByIdAndUpdate(id, { firstName, lastName, age })
        .then(updatedFriend => {
            res.status(200).json(updatedFriend);
        })
        .catch(err => {
            res.status(404).json({ error: 'No friend by that id in DB' });
            console.log(err);
        });    
  });

module.exports = router;