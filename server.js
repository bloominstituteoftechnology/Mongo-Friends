import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/user.js';

const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/users', (req, res) => {
	const ns = new User(req.body);
	ns.save((err, user) => {
		if(err) {
			res.status(STATUS_SERVER_ERROR).json({ error: "Failed to create a new user" });
		} else {
			res.status(200).json(user);
		}
	});
});

app.get('/users', (req, res) => {
	res.send(User.find((err, user) => { if(err) console.log(err) }));
});

app.get('/users/:id', (req, res) => {
	res.json(User.find({_id: req.params.id}, (err, res) => { if(err) console.log(err) }));
});

app.delete('/users/:id', (req, res) => {
	res.json(Users.findOneAndRemove({_id: req.params.id}, (err, res) => { if(err) console.log(err) }));
});


mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/bears',
  { useMongoClient: true }
);

//IF SUCCESSFUL CONNECT FIRE UP SERVER
/* eslint no-console: 0 */
connect.then(() => {
  const port = 3000;
  app.listen(port);
  console.log(`Server Listening on ${port}`);
}, (err) => {
  console.log('\n************************');
  console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?");
  console.log('************************\n');
});