const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

const server = express();

const friendsController = require("./Friends/friendsController");

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/friends", friendsController);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

mongoose.Promise = global.Promise;
mongoose.connect(
  "mongodb://localhost/friendsdb",
  {},
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log("Mongoose connected us to our database");
    }
  }
);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
