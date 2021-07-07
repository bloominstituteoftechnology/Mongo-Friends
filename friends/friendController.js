const router = require('express').Router();

const Friend = require('./friendsModel')

router.post('/', function post(req, res) {
  const friendData = req.body;
  const friend = new Friend(friendData);
  // const { age, lastName, firstName } = req.body;
  // if(age < 120 || age !== Number ){
  // res.status(400).json({ errorMessage: "Age must be a number between 1 and 120"}).end();
  // } else {
  friend
    .save()
    .then(friend => {
      res.status(201).json(friend)
    })
    .catch(err => {
      // if (typeof age !== Number) {
      //   res.status.json({ errorMessage: "Age must be a number between 1 and 120"});
      // }
        if (friendData !== true ) {
            res.status(400).json({ errorMessage: 'Please provide firstName, lastName and age for the friend.' })
      } else {
          res.status(500).json({ error: "There was an error while saving the friend to the database." })
      }
      })
});




router.get('/', function get(req, res) {
  Friend.find().then(friends => {
    res.status(200).json(friends);
  })
  .catch(err => res.status(500).json({errorMessage: 'The friends informations could not be retrieved.'}));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Friend.findById(id)
    .then(friends => {
      res.status(200).json(friends)
      .catch(err => res.status(404).json({errorMessage:'The friend informations could not be retrieved.'}))
    })
    .catch(err => res.status(500).json({errorMessage: 'The friend with the specified ID does not exist.'}));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Friend.findByIdAndRemove(id)
    .then(friend => {
      if (friend) {
        res.status(204).end();
      } else {
        res.status(404).json({ errorMessage: 'The Friend could not be removed' });
      }
    })
    .catch(err => res.status(500).json({ Message:"The friend with the specified Id does not exist."}));
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;
  const options = {
    new: true,
  };

  Friend.findByIdAndUpdate(id, update, options)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend)
        .catch(err => {
          res.status(404).json({ message: 'The friend with the specified ID does not exist.'})
        })
      } else {
        res.status(404).json({ errorMessage: 'Blah Blah' })
      }
    })
    .catch(err => res.status(500).json({errorMessage: 'Please provide firstName, lastName and age for the friend.'}));
});


module.exports = router;