const router = require('express').Router();
const Friend = require('./friendModel');


//middleware to sanitize the body
const sanitizeMiddleWare = (() => {

  //a little helper function to remove undefined object keys
  const clean = (obj) => {
    for (let keyName in obj) {
      if (obj[keyName] === undefined) delete obj[keyName];
    }
    return obj;
  }

  return (req, res, next) => {
    const { firstName, lastName, age } = req.body;
    req.saneBody = clean({ firstName, lastName, age });
    next();
  }
})();

router
  .route('/')
  .get((req, res) => {
    console.log(Friend);
    Friend.find()
      .then(friends => {
        res.json({ friends });
      })
      .catch(error => res.status(500).json({ error: 'Error fetching friends' }));
  })
  .post(sanitizeMiddleWare, (req, res) => {
    const postFriend = new Friend(req.saneBody);
    postFriend
      .save()
      .then(postedFriend => {
        res.status(201).json(postedFriend);
      })
      .catch(error => {
        res.status(500).json({ error: error });
      });
  });

router
  .route('/:id')
  .get((req, res) => {
    Friend
      .findById(req.params.id)
      .then(friend => {
        if (friend) res.json({ friend });
        else res.status(404).json({ error: 'No such friend found.' })
      })
      .catch(error => res.status(500).json({ error: 'Error fetching friend' }));
  })
  .delete((req, res) => {
    Friend
      .findByIdAndDelete(req.params.id)
      .then(deletedFriend => {
        if (deletedFriend) res.json({ deletedFriend });
        else res.status(422).json({ error: 'No such friend found' });
      })
      .catch(error => res.status(500).json({ error: 'Error deleting friend' }));
  })
  .put(sanitizeMiddleWare, (req, res) => {
    Friend
      .findByIdAndUpdate(req.params.id, req.saneBody, { new: true } )
      .then(editedFriend => {
        if (editedFriend) res.json({ editedFriend });
        else res.status(422).json({ error: 'No such friend found' });
      })
      .catch(error => res.status(500).json({ error: 'Error editing friend' }));
  });

module.exports = router;
