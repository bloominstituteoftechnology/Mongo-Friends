const router = require("express").Router();
const Friend = require("./friendModel");

router
  .route("/") //These routes will be /api/friends

  //Get all friends--------------------------------------------------------------------------------------------
  .get((req, res) => {
    Friend.find()
      .then(friends => {
        res.status(200).json(friends);
      })
      .catch(err => {
        res.status(500).json({ errorMessage: "The friends information could not be retrieved."}).end();
      })
  })
  
  //Add a friend-----------------------------------------------------------------------------------------------
  .post((req, res) => {
    const friendData = req.body;
    if (!friendData.firstName || !friendData.lastName || !friendData.age) {
      res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend."}).end();
    }
    if ((friendData.age < 1) || (friendData.age > 120)) {
      res.status(400).json({ errorMessage: "Age must be a number between 1 and 120"}).end();
    }
    //need to validate here.
      const friend = new Friend (friendData);
      friend
        .save()
        .then(friend => {
          res.status(201).json(friend);
        })
        .catch(err => {
          res.status(500).json({ errorMessage: "There was an error while saving the friend to the database."}).end();
        });
      }
  );

router
  .route("/:id") //these routes will be /api/friends/:id

  //get a friend with unique _id---------------------------------------------------------------------------------
  .get((req, res) => {
    const { id } = req.params;
    Friend.findById(id)
    .then(friend => {
      if (!friend) {
        res.status(404).json({ errorMessage: "The friend with specified ID does not exist."});
      } else {
        res.status(200).json(friend);
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friend information could not be retrieved."});
    })
  })

  .delete((req, res) => {
    const { id } = req.params;
    Friend.findByIdAndRemove(id)
    .then(friend => {
      if (!friend) {
        res.status(404).json({ message: "The friend with the specified ID does not exist."})
      } else {
        res.status(204).json({ message: "The friend was successfully deleted."})
      } // need to figure out why above wont work..
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "The friend could not be removed"})
    })
  })

  //update a friend-----------------------------------------------------------------------------------------------
  .put((req, res) => {
    const { id } = req.params;
    const update = req.body;
    const options = {
      new: true
    };
    Friend.findByIdAndUpdate(id, update, options).then(friend => {
      if (friend) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: "friend not found" });
      }
    });
  });

module.exports = router;
