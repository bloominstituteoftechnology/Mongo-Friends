const Friend = require('../../models/friend');

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
      if (error.name === 'CastError') {
        res.status(404).json({ error: 'The friend with the specified ID does not exist.' });
      } else {
        res.status(500).json({ error: 'The friend could not be removed.' });
      }
    });
};