const Friend = require('../../models/friend');

module.exports = (req, res) => {
  const { firstName, lastName, age } = req.body;
  const newFriend = new Friend({ firstName, lastName, age });

  newFriend.save()
    .then(friend => {
      res.status(201).send(friend);
    })
    .catch(error => {
      if (error.name === 'ValidationError'){
        res.status(400).json({ error: error.message })
      } else {
        res.status(500).json({ error: 'There was an error while saving the friend to the database.' });
      }
    });
};