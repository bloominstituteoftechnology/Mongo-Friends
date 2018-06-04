const Friend = require('../../models/friend');

module.exports = (req, res) => {
  Friend.find()
    .then(friends => {
      res.status(200).json(friends);
    })
    .catch(error => {
      res.status(500).json({ error: 'The friends information could not be retrieved.' });
    });
};