const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const friendRouter = require("./routers/friendRouter");
const bodyParser = require("body-parser");

const server = express();

mongoose
  .connect("mongodb://localhost/friendsdb")
  .then(mongo => {
    console.log("Connected to database");
  })
  .catch(error => {
    console.log(error);
  });

server.use(helmet());
server.use(cors());
server.use(bodyParser.json());
server.use("/api/friends", friendRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
