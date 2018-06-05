const Friend = require('../../models/friend');
const sendErrorMessage = require('./helpers');

module.exports = (req, res) => {
  const { id } = req.params;
  Friend.findByIdAndRemove(id)
    .then(deletedFriend => {
      if (deletedFriend) {
        res.status(200).json(deletedFriend);
      } else {
        res.status(404).json({ error: 'The friend with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      sendErrorMessage(error, res, 'The friend could not be removed.' );
    });
};