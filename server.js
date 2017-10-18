const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const models = require('./models');

const server = express();

server.use(bodyParser.json());

server.get('/users', (req, res) => {
	models.User.find((err, users) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(users);
		}
	})
})

server.get('/users/:id', (req, res) => {
	const { id } = req.params;
	// console.log(typeof id, id);
	models.User.findById(id, (err, user) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(user);
		}
	})
})

server.post('/users', (req, res) => {
	const { firstName, lastName, email } = req.body;

	const user = new models.User({firstName, lastName, email})

	user.save((err) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(user);
		}
	})
})

server.delete('/users/:id', (req, res) => {
	const { id } = req.params;

	models.User.findByIdAndRemove(id, (err) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json({message: 'deleted user'});
		}
	})
})

// blogposts routes
server.get('/posts', (req, res) => {
	models.BlogPost.find((err, bps) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(bps);
		}
	})
})

server.get('/posts/:id', (req, res) => {
	const { id } = req.params;
	models.BlogPost.findById(id, (err, bp) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(bp);
		}
	})
})

server.post('/posts', (req, res) => {
	const {title, contents} = req.body;

	const bp = new models.BlogPost({title, contents});

	bp.save((err) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json(bp);
		}
	})
})

server.delete('/posts/:id', (req, res) => {
	const { id } = req.params;

	models.BlogPost.findByIdAndRemove(id, (err) => {
		if (err) {
			res.status(500).json(err);
		} else {
			res.json({message: 'deleted post'});
		}
	})
})


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/lambdausers',
  { useMongoClient: true }
);

/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  server.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});