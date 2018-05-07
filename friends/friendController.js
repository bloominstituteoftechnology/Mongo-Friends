const router = require('express').Router();

const Friend = require('./friends');


router
  .route('/')
  .get(get)
  .post(post);

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/friends/' + req.params.id });
  }).catch(err=>{
     res.status(404).json({ message: "The friend with the specified ID does not exist." }) 
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
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
  if(frienddata.firstName !==undefined||frienddata.lastName !==undefinedfrienddata.age !==undefined){
      if(friendData.age >1 || friendData.age < 120){
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
res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
}
res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
}

module.exports = router;