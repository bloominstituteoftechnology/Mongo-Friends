const router = require('express').Router();
const Friend = require('./friendModel'); //pulling in the friend model file

router
  .route('/')
  .get((req, res) => {

    Friend
    .find()
    .then(friends => {
      res.status(200)
      res.json({ friends })
    })
    .catch (err => {
      res.status(500)
      res.json({ message: 'The friends information could not be retrieved.' });
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


router
.route('/:id')
.get((req, res) => {
  const { id } = req.params

  if(id == undefined) {
      res.status(404)
      res.json({ message: "The friend with the specified ID does not exist."})
  } 
  else {
    Friend
    .findById(id)
    .then(friend => {
        res.status(201)
        res.json({ friend })
})
    .catch(err => {
        res.status(500)
        res.json({ message: "The friend information could not be retrieved." })
    })
}})

.put((req, res) => {
    const { firstName, lastName, age } = req.body
    const { id } = req.params

    if(id == undefined) {
        res.status(404)
        res.json({ message: "The friend with the specified ID does not exist."})
    } 
    else if(typeof age !== 'number' || age > 120 || age < 1) {
        res.status(400)
        res.json({ message: "Age must be a number between 1 and 120" })
    }
    else {
    Friend
        .findByIdAndUpdate(id, { firstName, lastName, age }, { new: true })
        .then(updatedFriend => {
            res.status(200)
            res.json({ updatedFriend })
        })
        .catch(err => {
            res.status(500)
            res.json({message: "The friend information could not be modified."})
        })
}})

.delete((req, res) => {
    const { id } = req.params

Friend
.findByIdAndRemove(id)
    .then(deletedFriend => {
        if(deletedFriend == undefined) {
            res.status(404)
            res.json({ message: "This friend is no longer in our database and could not be removed."})
        }
        else {
            res.status(200)
            res.json({ deletedFriend })
        }
    })
    .catch(err => {
        res.status(500)
        res.json({ message: "The friend could not be removed."})
    })
})

module.exports = router;