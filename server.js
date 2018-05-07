const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// connecting to mongoose
mongoose
  .connect("mongodb://localhost/frienddb")
  .then(mongo => {
    console.log("connected to mongo Database");
  })
  .catch(err => {
    console.log("Error, cannot connect to database", err);
  });

const friendController = require("./friends/friendController");

const server = express();

// middleware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.use("/api/friends", friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
