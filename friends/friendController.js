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
    const newFriend = new Friend({ firstName, lastName, age });
    newFriend
      .save() 
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        res.status(422).json({ error: err });
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
    res.status(200).json({ status: 'please implement DELETE functionality' });
    // findByIdAndRemove
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
    // findByIdAndUpdate
  });

module.exports = router;