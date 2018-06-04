const router = require("express").Router();
const Friend = require("../models/Friend");

let errorMessage = (statusCode, message, response) => {
    resonse.status(statusCode).json({error: message});
    return;
}

router
    .route("/")
    .get((req, res) => {
        Friend.find()
        .then(friends => {
            res.json(friends);
        })
        .catch(err => {
            errorMessage(500, "Error fetching friends", res);
        })
    })
    .post((req, res) => {
        const { firstName, lastName, age, } = req.body;
        if(!firstName || !lastName || !age) {
            errorMessage(400, "Please provide first name last name and age", res);
        }
        const newFriend = new Friend({firstName, lastName, age});
        newFriend.save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                errorMessage(500, "There was an error while saving the friend to the database");
            });
    });

    module.exports = router;