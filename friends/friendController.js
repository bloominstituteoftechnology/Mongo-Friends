const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get(get)
  .post(post);


router
.route('/:id')
.get(getid)
// .delete(deleteid)
// .put(putid)
// .get((req, res) => {
// res.status(200).json({ route: '/api/friends/' + req.params.id });
// })
// .delete((req, res) => {
// res.status(200).json({ status: 'please implement DELETE functionality' });
// })
// .put((req, res) => {
// res.status(200).json({ status: 'please implement PUT functionality' });
// });

//GET   /api/friends
function get(req, res) {
    Friend.find().then(friends => {
      res.status(200).json(friends);
    })
    //If there's an error retrieving the friends from the database:
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
    });
  }

  //GET by id   /api/friends/:id
  function getid(req, res) {
    const id = req.params.id;

    Friend //think of friend as 'db' from previous proj
    .findById(id)
    .then(friends => {
        //If the friend with the specified id is not found:
        if (friends.length === 0) {
            res.status(404).json({ message: "The friend with the specified ID does not exist." })
        }
        res.status(200).json(friends);
    })
    //If there's an error in retrieving the friend from the database:
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
    });
}


//POST   /api/friends 
function post(req, res) {
    const {age, firstName, lastName, createdOn} = req.body;
    const friendData = {age, firstName, lastName, createdOn};

    const friend = new Friend(friendData);
    //If the request body is missing the firstName, lastName or age property:
    if (!req.body) {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
    }
    //If the value for age is not a number or it has a value that is less than 1 or more than 120:
    if ((!typeof age === 'number') || age.length === 0 || age.length > 120) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
    } else
    friend //think of friend as 'db' from previous proj
        .save()
        .then(bff => {
        res.status(201).json(bff);
        })
        //If there's an error while saving the friend:
        .catch(err => {
        res.status(500).json({ errorMessage: "There was an error while saving the friend to the database." })
        });
  }


  //PUT   /api/friends/:id


  //DELETE   /api/friends/:id

  
  //export
  module.exports = router;