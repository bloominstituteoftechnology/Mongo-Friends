const router = require('express').Router();
const Friend = require('./friendModel'); //pulling in the friend model file

router
  .route('/')
  .get((req, res) => {
    Friend.find()
    .then(friends => {
      res.status(202)
      res.json({ friends })
    })
    .catch (err => {
      res.status(200)
      res.json({ message: 'Error fetching friends' });
    })
  })
  .post((req, res) => {
      const { firstName, lastName, age } = req.body;
      const newFriend = new Friend({ firstName, lastName, age });

    if(!firstName || !lastName || !age) {
        res.status(400)
        res.json({ message: "Please provide firstName, lastName and age for the friend."})
        return;
    }
    else if(typeof age !== 'number' || age > 120 || age < 1) {
        res.status(400)
        res.json({ message: "Age must be a number between 1 and 120" })
    }
    else {
        
    newFriend
    .save()
    .then(savedFriend => {
        res.status(201)
        res.json({ savedFriend })
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "There was an error while saving the friend to the database."})
    })
  }})




module.exports = router;