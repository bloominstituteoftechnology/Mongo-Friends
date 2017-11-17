const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const apiRouter = require("./common/apiRouter.js");

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use("/api", apiRouter);

//connect to Mongoose
mongoose.Promise = global.Promise;
mongoose
    .connect("mongodb://localhost:27017/users", { useMongoClient: true })
    .then(function(db) {
        console.log("All your databases are belong to us!");
        server.listen(3000, function() {
            console.log("Running on port 3000...");
        });
    })
    .catch(function(err) {
        console.log("Database Connection failed", err.message);
    });
