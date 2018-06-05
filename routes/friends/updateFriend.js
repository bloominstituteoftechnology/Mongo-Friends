const Friend = require('../../models/friend');
const sendErrorMessage = require('./helpers');

module.exports = (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  Friend.findByIdAndUpdate(id, { firstName, lastName, age }, { new: true })
    .then(updatedFriend => {
      if (updatedFriend) {
        res.status(200).json(updatedFriend);
      } else {
        res.status(404).json({ error: 'The friend with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      sendErrorMessage(error, res, 'The friend information could not be modified.');
    });
};