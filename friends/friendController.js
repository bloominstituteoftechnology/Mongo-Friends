const router = require('express').Router();

const Friend = require('./friendModel.js');


router
.route('/')
.get((req, res) => {
    Friend.find()
    .then(friends => {
      res.status(200).json(friends)
    })
    .catch(err => {
        res.status(500).json({errorMessage: `The friends information could not be retrieved.error: ${err}`});
    })
})
.post((req, res) => {
    const { firstName, lastName, age} = req.body;
    if (!firstName || !lastName || !age) {
      res.status(400).json({errorMessage: "Please provide firstName lastName and age for the friend." })
      return;
    }
    if (age !== Number || age < 1 || age > 120) {
        res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
        return;
      }
    const newFriend = new Friend({firstName, lastName, age});
    newFriend.save()
    .then(response => {
      console.log(response);   
    })
    .catch(err => {
      res.status(500).json({error: err})
    }) 
  });
//     firstName: "Jane", // String, required
//     lastName: "Doe",  // String, required
//     age: 18, // Number, required, should be an integer between 1 and 120//   

router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        Friend
            .findById(id)
            .then(response => {
                if(response === null) {
                    res.status(404).json({errorMessage: `The friend with the ID ${id} does not exist`})
                    return;
                }
                res.json(response);
            })
            .catch(err => {
                res.status(500).json({errorMessage: `The friend information could not be retrieved. error: ${err}`})
            });
    })
    .delete((req, res) => {
        const { id } = req.params;
        Friend
            .findByIdAndDelete(id)
            .then(response => {
                if(response === null) {
                    res.status(404).json({errorMessage: `The friend with the ID ${id} does not exist`})
                    return;
                }
                res.json(response);
            })
            .catch(err => {
                res.status(500).json({errorMessage: `The Friend with the specified ID does not exist. error: ${err}`})
            })
    })
    .put((req, res) => {
        const { id } = req.params;
        const updatedFriend = ({ firstName, lastName, age } = req.body);
        if (age !== Number ||age < 1 || age > 120) {
            res.status(400).json({ errorMessage: "Age must be a number between 1 and 120" })
            return;
          }
        Friend
            .findByIdAndUpdate(id, updatedFriend, {new: true})
            .then(response => {
                if(response === null) {
                    res.status(404).json({errorMessage: `The friend with the ID ${id} does not exist`})
                    return;
                }
                res.json(response);
            })
            .catch(err => {
                res.status(500).json({errorMessage: `The friend information could not be modified. . error: ${err}`})
            })
    });


module.exports = router;