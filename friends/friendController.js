const router = require('express').Router();

const Friend = require('./friendModel');

router
  .route('/')
  .get(get)
  .post(post);

router
.route('/:id')
.get(getid)
.delete(deleteid)
.put(putid)


//GET   /api/friends //POSTMAN TEST OK! 
function get(req, res) {
    Friend.find().then(friends => {
      res.status(200).json(friends);
    })
    //If there's an error retrieving the friends from the database:
    .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved." })
    });
  }

//OTHER SYNTAX:
//   router.get('/', function get(req, res) {
//     Friend.find().then(friends => {
//       res.status(200).json(friends);
//     });
//   });


  //GET by id   /api/friends/:id  //POSTMAN TEST OK!
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

//OTHER SYNTAX:
// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     Friend.findById(id)
//       .then(friends => {
//         res.status(200).json(friends);
//       })
//       .catch(err => res.status(500).json(err));
//   });

//-----------------------------------------------------------------------------------------------------

//POST   /api/friends   //POSTMAN TEST OK!
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

//OTHER SYNTAX:
// router.post('/', function post(req, res) {
//     const friendData = req.body;
//     const friend = new Friend(friendData);
  
//     friend
//       .save()
//       .then(friend => {
//         res.status(201).json(friend);
//       })
//       .catch(err => {
//         res.status(500).json(err);
//       });
//   });

//-----------------------------------------------------------------------------------------------------

//PUT   /api/friends/:id
function putid(req, res) {
    const {age, firstName, lastName, createdOn} = req.body;
    const id = req.params.id;
    if(!Friend.findById(id)) {
        res.status(404).json({ message: "The friend with the specified ID does not exist." })
    }
    if (!req.body) {
        res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." })
    }
    if(!(typeof age === 'number') || age.length === 0 || age.length > 120) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
    } else 
    Friend.findByIdAndUpdate(id, req.body)
    .then(update => {
        res.status(200).json(update);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friend information could not be modified." })
    })
}

//OTHER SYNTAX:
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const update = req.body;
  
//     const options = {
//       new: true,
//     };
  
//     Friend.findByIdAndUpdate(id, update, options)
//       .then(friend => {
//         if (friend) {
//           res.status(200).json(friend);
//         } else {
//           res.status(404).json({ msg: 'Friend not found' });
//         }
//       })
//       .catch(err => res.status(500).json(err));
//   });

//-----------------------------------------------------------------------------------------------------

//DELETE   /api/friends/:id   //Postman Test OK! http://localhost:5000/api/friends/5af21107dd8b65398c3c585b (created test post to remove by ID which was successful)
function deleteid(req, res) {
    const id = req.params.id;

    if(!Friend.findById(id)) {
        res.status(404).json({ message: "The friend with the specified ID does not exist." })
    }
    Friend.findByIdAndRemove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The friend could not be removed" })
    });

}

//OTHER SYNTAX:
// web example: /api/friends/1234
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
  
//     Friend.findByIdAndRemove(id)
//       .then(friend => {
//         if (friend) {
//           res.status(204).end();
//         } else {
//           res.status(404).json({ msg: 'Friend not found' });
//         }
//       })
//       .catch(err => res.status(500).json(err));
//   });

//-----------------------------------------------------------------------------------------------------
  
  //export
  module.exports = router;