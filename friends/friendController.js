const router = require('express').Router();
const FriendModel = require('./friendModel');

router
  .route('/')
  .post((req, res) => {
    const friend = new FriendModel(req.body);

    if (!friend.firstName || !friend.lastName || !friend.age) res.status(400).json({error: "Please include a first name, last name, age, and contact info for the friend"});
    else if (friend.age !== Math.floor(friend.age)) res.status(400).json({error: "Age must be a rounded number"});
    else {
        friend
            .save()
            .then(ans => {
                res.status(201).json(ans)
            })
            .catch(err => {
                res.status(500).json({error: "There was an error adding your friend", err});
            });
    }
    })

    .get((req,res) => {
        FriendModel.find({})
        .then(ans => {
            res.status(200).json(ans);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    })
    


router
    .route('/:id')
    .get((req, res) => {
        const { id } = req.params;
        FriendModel.findById(id)
        .then(ans => {
            res.status(200).json(ans);
        })
        .catch(err => {
            res.status(500).json(err);
        });
    })
    .delete((req, res) => {
        const { id } = req.params;
        FriendModel.findByIdAndRemove(id)
        .then(ans => {
            res.json({status: "Success!"});
        })
        .catch(err => {
            if (err.name === "CastError") res.status(404).json(`${err.value} is not a valid ID`);
            else {
                res.status(500).json({error: "There was an error deleting the friend"});
            }
        })
    })
    .put((req, res) => {
        const { id } = req.params;
        const newInfo = req.body;
        const { age } = newInfo;
        if (age < 1 || age > 120) res.status(400).json({error:"An age between 0 and 120 is required"});
        else {
            FriendModel.findByIdAndUpdate(id, newInfo)
            .then(ans => {
                const newFriend = newInfo;
                res.status(200).json(newFriend);
            })
            .catch(err => {
                if (err.name === "CastError") res.status(404).json(`${err.value} is not a valid id`);
                else {
                    res.status(500).json(err.message);
                }
            })
    }
    })





module.exports = router;

