const Friend = require('../../models/friend');
const sendErrorMessage = require('./helpers');

module.exports = (req, res) => {
  const { firstName, lastName, age } = req.body;
  const newFriend = new Friend({ firstName, lastName, age });

  newFriend.save()
    .then(friend => {
      res.status(201).send(friend);
    })
    .catch(error => {
      sendErrorMessage(error, res, 'There was an error while saving the friend to the database.' );
    });
};