const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// Connect to mongo
mongoose
  .connect("mongo://localhost/frienddb")
  .then(mongo => {
    console.log("Connected to friend database.");
  })
  .catch(error => {
    console.log("Error connecting to friend database.");
  });

const friendController = require("./friends/friendController");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.use("/api/friends", friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
