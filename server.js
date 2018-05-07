const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const server = express();

// connect to mongo
// mongodb://{hostname}:{port}/{dbname}
mongoose
	.connect("mongodb://localhost:27017/friendsdb")
	.then(mongo => {
		console.log("connected to database");
	})
	.catch(err => {
		console.log("Error conencting to database", err);
	});

server.use(helmet());
server.use(cors());
server.use(express.json());

// import sub-applications
const Friend = require("./friends/Friend");

server.get("/", (req, res) => {
	res.status(200).json({ api: "running" });
});

// route handlers
server.use("/api/friends", Friend);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
