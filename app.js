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

//error messages
const badReq = 400;
const badReqRes = { errorMessage: "Please provide firstName, lastName, and age for the friend."};

//post handler
app.post("/api/friends", (req, res) => {
    const newfName = req.body.firstName;
    const newlName = req.body.lastName;
    const newAge = req.body.age;
    const time = new Date();

    if (!newfName || !newlName || !newAge){
        res.status(badReq);
        return res.json(badReqRes);
    } else {
        const newFriend = new FriendSchema({
            firstName: newfName,
            lastName: newlName,
            age: newAge,
            createdOn: time,
        })
        newFriend.save()
        .then(response => {
            console.log(`Friend added successfully`);
            res.send(`A new friend was added: ${newFriend}`);
        })
        .catch(err => {
            console.log(`There was an error adding a new friend: ${err}`);
            res.send(`There was an error adding the friend`)
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