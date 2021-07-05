const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/friendsdb")
  .then(() => console.log(`\n=== connected to mongo ===\n`))
  .catch(err => res.status(500).json(err));

const friendController = require("./friends/friendController");
const server = express();

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.use("/api/friends", friendController);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
