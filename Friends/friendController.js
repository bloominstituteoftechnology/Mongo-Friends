const router = require('express').Router();

const Friend = require('./friendModel')

router
  .route('/')
  .get(get)
  .post(post)

router
  .route("/:id").get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(404).json({ message: "The friend with the specified ID does not exist." }, err);
      })
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(404).json({ message: "The friend with the specified ID does not exist." }, err);
      })
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(friend => {
        res.status(200).json(friend);
      })
      .catch(error => {
        res.status(404).json({ message: "The friend with the specified ID does not exist." }, err);
      })
  });

function get(req, res) {
  Friend.find().then(friends => {
    res.status(200).json(friends);
  })
  .catch(err => {
    res.status(500).json({ errorMessage: "The friends information could not be retrieved." }, err); 
})
};

function post(req, res) {
  const friendData = req.body;

  const friend = new Friend(friendData);

  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      res.status(500).json({errorMessage: "Please provide firstName, lastName and age for the friend." }, err);
    })
};

module.exports = router;
