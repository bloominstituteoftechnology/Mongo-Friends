const Friend = require('../../models/friend');
const sendErrorMessage = require('./helpers');

module.exports = (req, res) => {
  const { id } = req.params;
  Friend.findById(id)
    .then(friend => {
      if(friend){
        res.status(200).json(friend);
      } else {
        res.status(404).json({ error: 'The friend with the specified ID does not exist.' });
      }
    })
    .catch(error => {
      sendErrorMessage(error, res, 'The friend information could not be retrieved.');
    });
};