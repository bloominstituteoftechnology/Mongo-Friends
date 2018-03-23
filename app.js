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

//initialzing mongoose
mongoose.connect("mongodb://localhost:27017/FriendsDB");
mongoose.connection
.once("open", () => console.log("The database is open"))
.on("error", (err) => console.log(`There was an error starting the database: ${err}`));

//get handler for all documents
app.get("/api/friends", (req, res) => {
    FriendSchema.find({})
    .then(response => res.json(response))
    .catch(err => {
        res.status(500);
        res.json({error: "The information could not be retrieveed."});
    })
})

//get handler for specific documents
//problems with conditional--see assignment
app.get("/api/friends/:id", (req, res) => {
    const id = req.params.id;

    FriendSchema.findById(id)
    .then(response => {
        if (!response){
            res.status(500);
            return res.json({message: "The friend with the specified ID does not exist"});
        } else {
            res.json(response);
        }   
    })
    .catch(err => {
        res.status(404);
        res.json({error: "The information could not be retreived."})
    })
})

//post handler
app.post("/api/friends", (req, res) => {
    const newfName = req.body.firstName;
    const newlName = req.body.lastName;
    const newAge = req.body.age;
    const time = new Date();
    if (!newfName || !newlName || !newAge){
        res.status(400);
        return res.json({ errorMessage: "Please provide firstName, lastName, and age for the friend." });
    } else if (newAge < 1 || newAge > 120){
        res.status(400);
        return res.json({ errorMessage: "Age must be a whole number between 1 and 120." });
    } else {
        const newFriend = new FriendSchema({
            firstName: newfName,
            lastName: newlName,
            age: newAge,
            createdOn: time,
        })
        newFriend.save()
        .then(response => {
            res.status(201);
            res.json(newFriend);
        })
        .catch(err => {
            res.status(500);
            res.send({ error: "There was an error while saving the friend to the database." });
        })
    }
})

//delete request handler
app.delete("/api/friends/:id", (req, res) => {
    const id = req.params.id;
    FriendSchema.findByIdAndRemove(id)
    .then(response => {
        if (!response){
            res.status(404);
            return res.json({message: "The friend with the specified ID does not exist"});
        } else {
            res.json(response);
        }
    })
    .catch(err => {
        res.status(500);
        res.json({error: "The friend could not be removed."});
    })
})

//put request handler
app.put("/api/friends/:id", (req, res) => {
    const id = req.params.id;
    const newfName = req.body.firstName;
    const newlName = req.body.lastName;
    const newAge = req.body.age;

    if (!newfName || !newlName || !newAge) {
        res.status(400);
        return res.json({error: "Please provide firstName, lastName and age for the friend."});
    } else if (newAge < 1 || newAge > 120){
        res.status(400);
        return res.json({ errorMessage: "Age must be a whole number between 1 and 120." });
    } else {
        FriendSchema.findByIdAndUpdate(id, {
        $set: req.body,
    })
    .then(response => {
        if (!response){
            res.status(404);
            return res.json({message: "The friend with the specified ID does not exist"});
        } else {
            res.status(200);
            return res.json(req.body);
        }
    })
    .catch(err => {
        res.status(500);
        res.json({error: "The friend information could not be modified."})
    })}
})

//starting the server
app.listen(3000, () => console.log(`The Express server is listening at port 3000`));