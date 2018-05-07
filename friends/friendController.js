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

        friend 
            .save()
            .then(friend => {
                res.status(200).json(friend);
                 if (!friendData.firstName || !friendData.lastName) {
                   res
                     .status(400)
                     .json(
                       "Please provide firstName, lastName and age for the friend."
                     );
                 }

                else if (friendData.age < 1 || friendData.age > 120) {
                    res
                      .status(400)
                      .json(
                        "Age must be a number between 1 and 120"
                      );
                }
            }).catch(err => {
                res
                  .status(500)
                  .json(
                    "There was an error while saving the friend to the database."
                  );
            });
    });

    module.exports = router;