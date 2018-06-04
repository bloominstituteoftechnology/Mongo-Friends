const Friend = require('../../models/friend');

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
      if(error.name === 'CastError'){
        res.status(404).json({ error: 'The friend with the specified ID does not exist.' });
      } else {
        res.status(500).json({ error: 'The friend information could not be retrieved.' });
      }
    });
};