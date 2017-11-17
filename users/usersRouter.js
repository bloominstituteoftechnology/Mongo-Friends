const express = require("express");

const User = require("./UserModel.js");
const statusCodes = require("../common/statusCodes.js");

const userRouter = express.Router();

//Users Goes here
userRouter.post("/", function(req, res) {
    const newUser = new User(req.body);

    newUser.save(function(err, user) {
        if (err) {
            res
                .status(statusCodes.userError)
                .json({ error: "Could not get the user" });
        } else {
            res
                .status(statusCodes.created)
                .json(`Success! ${user.firstname} added to users database`);
        }
    });
});

userRouter.get("/", function(req, res) {
    User.find({}, function(err, users) {
        if (err) {
            res
                .status(statusCodes.userError)
                .json({ error: "Server error: Could not display Users" });
        } else {
            res.status(statusCodes.success).json(users);
        }
    });
    // res.status(200).json({ running: 'yes' });
});

userRouter.get("/:id", function(req, res) {
    const { id } = req.params;

    User.findOne({ _id: id }, function(err, users) {
        if (err) {
            res
                .status(statusCodes.userError)
                .json({
                    error: "User error: could not find the specified user."
                });
        } else {
            res.status(statusCodes.success).json(users);
        }
    });
});

userRouter.delete("/:id", function(req, res) {
    const { id } = req.params;

    User.findOneAndRemove({ _id: id }, function(err, users) {
        if (err) {
            res.status(statusCodes.userError).json({ message: err.message });
        } else {
            res
                .status(statusCodes.userError)
                .json(
                    `User error: no user with specified id found.(id: ${id})`
                );
        }
    });
});

module.exports = userRouter;
