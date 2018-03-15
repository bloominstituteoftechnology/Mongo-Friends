/* eslint-disable */

//module/Schema imports
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const FriendSchema = require("./models/Friend");

//initializing express
const app = express();

//setting middleware
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

//status codes
const badSave = 500;
const badReq = 400;
const successReq = 201;

//status messages
const errorSaving = { error: "There was an error while saving the friend to the database." };
const badReqRes = { errorMessage: "Please provide firstName, lastName, and age for the friend." };
const badReqAge = { errorMessage: "Age must be a whole number between 1 and 120." };

//post handler
app.post("/api/friends", (req, res) => {
    const newfName = req.body.firstName;
    const newlName = req.body.lastName;
    const newAge = req.body.age;
    const time = new Date();
    if (!newfName || !newlName || !newAge){
        res.status(badReq);
        return res.json(badReqRes);
    } else if (newAge < 1 || newAge > 120){
        res.status(badReq);
        return res.json(badReqAge);
    } else {
        const newFriend = new FriendSchema({
            firstName: newfName,
            lastName: newlName,
            age: newAge,
            createdOn: time,
        })
        newFriend.save()
        .then(response => {
            res.status(successReq);
            res.json(newFriend);
        })
        .catch(err => {
            res.status(badSave);
            res.send(errorSaving);
        })
    }
})

//initialzing mongoose
mongoose.connect("mongodb://localhost:27017/FriendsDB");
mongoose.connection
.once("open", () => console.log("The database is open"))
.on("error", (err) => console.log(`There was an error starting the database: ${err}`));

//starting the server
app.listen(3000, () => console.log(`The Express server is listening at port 3000`));