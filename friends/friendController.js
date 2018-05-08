const router = require("express").Router();

const Friend = require("./friendsModel");

router
  .route("/")
  .get(get)
  .post(post);

router
  .route("/:id")
  .get((req, res) => {
    Friend.findbyId(req.params.id)
      .then(friend => {
        if (!friend) {
          res.status(404).json({ error: "No friend under that ID number." });
        } else {
          res.status(200).json(friend);
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The friend id could not be retrieved." });
      });
  })

  .put((req, res) => {
    const friendData = req.body;
    if (!friendData.firstName || !friendData.lastName || friendData.age) {
      return res.status(400).json({ error: "Please fill out all fields." });
    } else if (age < 1 || age > 120 ) {
      res.status(400).json({
        error: "Age must be between 1 to 120."
      });
    }
    
  });
