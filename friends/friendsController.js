const router = require("express").Router();

const Friend = require("./friendsModel");

// endpoint /api/friends

router
    .route("/")
    .get((req, res) => {
        Friend.find({})
            .then(friends => {
                res.status(200).json(friends);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Cannot get friends" });
            });
    })
    .post((req, res) => {
        const friend = new Friend(req.body);

        if (!req.body.firstName || !req.body.lastName || !req.body.age) {
            res.status(400).json({
                message:
                    "Please create a firstName, lastName, and age for the new friend",
            });
        }
        if (req.body.age > 120 || req.body.age < 1) {
            res
                .status(400)
                .json({ message: "Please enter an age between 1 and 120" });
        }

        friend
            .save()
            .then(savedFriend => {
                res.status(201).json(savedFriend);
            })
            .catch(err => {
                res.status(500).json({ errorMessage: "Cannot add friend" });
            });
    });

router.route("/:id").get((req, res) => {
    Friend.findById(req.params.id)
        .then(friend => {
            console.log("friend", friend);
            res.status(200).json(friend);
        })
        .catch(err => {
            res.status(500).json({ errorMessage: "Cannot get friend" });
        });
});

module.exports = router;
