const router = require('express').Router();
const Friend = require('./friendModel');

// gets
router 
    .route('/')
    .get((req, res) => {
        Friend.find().then(friends => {
            res.status(200).json(friends);
        }).catch(err => {
            res
              .status(500)
              .send({
                error:
                  "The friends information could not be retrieved."
              });
        });
        
    })

    .post((req, res) => {
        const friendData = req.body;
        
        const friend = new Friend(friendData);
        if (!friendData.firstName || !friendData.lastName || !friendData.age) {
          res
            .status(400)
            .json(
              "Please provide firstName, lastName and age for the friend."
            );
        } 
        if (parseInt(friendData.age) < 1 || parseInt(friendData.age) > 120) {
          res
            .status(400)
            .send({error: "Age must be a number between 1 and 120"});
        }
        else {

        friend 
            .save()
            .then(friend => {
                res.status(200).json(friend);
            }).catch(err => {
                res
                  .status(500)
                  .json(
                    "There was an error while saving the friend to the database."
                  );
            });
        }
    });
router 
    .route('/:id')
    .get((req, res) => {
        const id = req.params.id;

        Friend.findById(id).then(friend => {
            if (friend.length === 0) {
                res
                  .status(404)
                  .json(
                    "The friend with the specified ID does not exist."
                  );
            } else {
                res.status(200).json(friend);
            }
        }).catch(err => {
            res
              .status(500)
              .json(
                "The friend with the specified ID does not exist."
              );
        })
    })
    .delete((req, res) => {
        const id = req.params.id;
        console.log(id);
        Friend.findByIdAndRemove(id)
            .then(friend => {
                if (friend.length === 0) {
                    res
                      .status(404)
                      .json(
                        "The friend with the specified ID does not exist."
                      );
                } else {
                    res.status(204).json(friend);
                }
            }).catch(err => {
                res
                  .status(500)
                  .json("The friend could not be removed");
            })
    })

    .put((req, res) => {
        const id = req.params.id;

        let friend = req.body;

        Friend.findByIdAndUpdate(id, friend)
            .then(friend => {
                if (!friend) {
                    rest
                      .status(404)
                      .json(
                        "The friend with the specified ID does not exist."
                      );
                } 
                else {
                    res.status(200).json(friend);
                }
            }).catch(err => {
                res
                  .status(500)
                  .json(
                    "The friend information could not be modified."
                  );
            })
    })

module.exports = router;