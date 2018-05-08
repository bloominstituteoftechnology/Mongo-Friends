const router = require('express').Router();
const Friend = require('./friendsModel');

router.route('/')
  .get((req, res) => {
    Friend.find()
      .then(friends => res.status(200).json(friends))
      .catch(err => res.status(500).json({ error: "Cannot retrieve friends." }))
  })

  .post((req, res) => {
    const friendData = req.body;
    const friend = new Friend(friendData);
    friend.save()
      .then(friend => res.status(200).json(friend))
      .catch(err => res.status(500).json({ error: "Failed to save friend. Check requirements for new friend." }))
  });

router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    Friend.findById(id)
      .then(friend => res.status(200).json(friend))
      .catch(err => res.status(500).json({ error: "Cannot retrieve any friend with the provided ID." }))
  })

  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
      .then(response => {
        response.length === 0 ? 
          res.status(404).json({ message: "The friend with the specified ID does not exist." }) :
          res.status(200).json(response) // returns deleted friend
      }) 
      .catch(err => res.status(500).json({ errorMessage: "The friend could not be removed" }))
  })

  .put((req, res) => {
    const { id } = req.params;
    const updatedFriend = req.body;
    Friend.findByIdAndUpdate(id, updatedFriend)
      .then(updated => res.status(200).json(updated)) // returns original friend data, still updates
      .catch(err => res.status(500).json({ error: "Cannot update this friend." }))
  })

module.exports = router;