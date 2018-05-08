const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://localhost:27017/friendsDB")
  .then(p => {
    console.log("connected to  friendsDB");
  })
  .catch(error => {
    console.log("connecting error ");
  });

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(bodyParser.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

const friendsRoute = require("./friendsRoute");
server.use("/friends", friendsRoute);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
