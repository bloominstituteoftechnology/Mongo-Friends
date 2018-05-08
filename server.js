const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

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

// import sub-applications
const Friend = require("./friends/Friend");
const ContactForm = require("./friends/ContactForm");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
	res.status(200).json({ api: "running" });
});

// route handlers
server.use("/api/friends", Friend);
server.use("/api/friends/contactForm", ContactForm);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n=== API up on port: ${port} ===\n`));
