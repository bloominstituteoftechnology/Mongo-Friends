const router = require('express').Router();

const Friend = require('./friends');


router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
    .get((req, res) => {
        const {id} = req.params
    Friend
    .findById(id)
    .then(friend=>{
           res.status(202).json(friend);
    })
    .catch(err=>{
        res.status(500).json({errorMessage: "The friends information could not be retrieved."})
    })
  })
  .delete((req, res) => {
    const {id} = req.params
    Friend
    .findByIdAndRemove(id)
    .then(friend=>{
        res.status(202).json(friend)
    })
  })
  .put((req, res) => {
    const {id} = req.params
    const update = req.body;
    Friend
    .findByIdAndUpdate(id,update)
    .then(friend=>{
      res.status(200).json(friend)
        })
  });

function get(req, res) {
  Friend.find().then(friends => {
    res.status(200).json(friends);
  })
  .catch(err=>{
      res.status(500).json({errorMessage: "The friends information could not be retrieved."})
  })
}

function post(req, res) {
  const friendData = req.body;
  console.log(friendData.firstName !==undefined||friendData.lastName !==undefinedfriendData.age !==undefined)
    console.log(friendData.age)
console.log(req.body)
  const friend = new Friend(friendData);

  friend
    .save()
    .then(friend => {
      res.status(201).json(friend);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." });
    });
}


module.exports = router;