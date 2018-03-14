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
let time = new Date();

//initialzing mongoose
mongoose.connect("mongodb://localhost:27017/FriendsDB");
mongoose.connection
.once("open", () => console.log("The database is open"))
.on("error", (err) => console.log(`There was an error starting the database: ${err}`));

//starting the server
app.listen(3000, () => console.log(`The Express server is listening at port 3000`));