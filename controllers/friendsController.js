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
        const { firstName, lastName, age, contactInfo} = req.body;
        if(!firstName || !lastName || !age) {
            errorMessage(400, "Please provide first name last name and age", res);
        }
        if(age < 0 || age > 120 ) {
            errorMessage(400, "Age should be between 0 and 120", res);
        }
        const newFriend = new Friend({firstName, lastName, age, contactInfo});
        newFriend.save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                errorMessage(500, "There was an error while saving the friend to the database");
            });
    });

    router
        .route("/:id")
        .get((req, res) => {
            const { id } = req.params;
            Friend.findById(id)
            .then(friend => {
                res.json(friend);
            })
            .catch(err => {
                if(err.name === "CastError") {
                    errorMessage(404, `The Friend with id of ${id} does not exist`, res);
                }
                errorMessage(500, "The Friend information cannot be retrieved", res);
            })
        })
        .delete((req, res) => {
            const { id } = req.params;
            Friend.findByIdAndRemove(id)
                .then(removedFriend => {
                    res.json(removedFriend);
                })
                .catch(err => {
                    if(err.name === "CastError") {
                        errorMessage(404, `The friend with id of ${id} does not exist`, res);
                    }
                    errorMessage(500, "The friend cannot be remove", res);
                })
        })
        .put((req, res) => {
            const { id } = req.params;
            const { firstName, lastName, age } = req.body;
            Friend.findByIdAndUpdate(id, {firstName, lastName, age})
                .then(friend => {
                    res.json(friend);
                })
                .catch(err => {
                    if(err.name === "CastError") {
                        errorMessage(404, `The friend with id of ${id} does not exist`, res);
                    }
                    errorMessage(500, "The friend information can not be modify", res);
                })
        })

    module.exports = router;