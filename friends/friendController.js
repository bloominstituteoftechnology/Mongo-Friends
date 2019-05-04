const router = require(`express`).Router();

const Friend = require(`./friendModel`);

const db_thrown_error = require(`./db_thrown_error`);

// api/friends

router
  .route(`/`)
  .get((req, res) => {
    Friend.find({})
      .then(friends => {
        if (friends.length === 0) {
          res.status(404).json({ error: `No Friends found!` });
        } else {
          res.status(200).json(friends);
        }
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `GET` });
        res.status(error.status).json(error.errorMessage);
      });
  })
  .post((req, res) => {
    // do some error checks
    if (req.body.firstName === undefined) {
      res.status(400).json({ error: `Please enter a first name` });
      return;
    }

    if (req.body.lastName === undefined) {
      res.status(400).json({ error: `Please enter a last name` });
      return;
    }

    if (req.body.age === undefined || typeof req.body.age !== `number`) {
      res.status(400).json({ error: `Please enter a valid age` });
      return;
    }

    // create a friend Model
    const friend = new Friend(req.body);

    friend
      .save()
      .then(savedFriend => {
        res.status(201).json(savedFriend);
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `POST` });
        res.status(error.status).json(error.errorMessage);
      });
  });

router
  .route(`/:id`)
  .get((req, res) => {
    Friend.findById(req.params.id)
      .then(friend => {
        if (friend === null) {
          res.status(404).json({ error: `The friend was not found!` });
        } else {
          res.status(200).json(friend);
        }
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `GET` });
        res.status(error.status).json(error.errorMessage);
      });
  })
  .delete((req, res) => {
    Friend.findByIdAndRemove(req.params.id)
      .then(deletedFriend => {
        if (deletedFriend === null) {
          res.status(404).json({ message: `Friend not found` });
        } else {
          res.status(200).json(deletedFriend);
        }
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `DELETE` });
        res.status(error.status).json(error.errorMessage);
      });
  })
  .put((req, res) => {
    Friend.findByIdAndUpdate(req.params.id, req.body)
      .then(updatedFriend => {
        if (updatedFriend === null) {
          res.status(404).json({ message: `Friend was not found` });
        } else {
          //update done, now get a fresh copy
          Friend.findById(updatedFriend.id)
            .then(friend => {
              res.status(200).json(friend);
            })
            .catch(err => {
              const error = db_thrown_error({
                error: err,
                type: `PUT`,
              });
              res.status(error.status).json(error.errorMessage);
            }); // findById using the updated bear
        } //if ends
      })
      .catch(err => {
        const error = db_thrown_error({ error: err, type: `PUT` });
        res.status(error.status).json(error.errorMessage);
      }); // findByIdAndUpdate
  });

module.exports = router;
