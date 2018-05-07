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
    Friend.findById(id).remove()
      .then(res => res.status(200).json(res)) // returns catch error but deletes specified friend
      .catch(err => res.status(500).json({ error: "Cannot delete friend with the provided ID." }))
  })

  .put((req, res) => {
    const { id } = req.params;
    const updatedFriend = req.body;
    Friend.findByIdAndUpdate(id, updatedFriend)
      .then(updated => res.status(200).json(updated)) // returns original friend data, still updates
      .catch(err => res.status(500).json({ error: "Cannot update this friend." }))
  })

module.exports = router;