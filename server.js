const express = require('express');
const bodyParser =require('body-Parser');
const mongoose =require('mongoose');

const User = require('./UserModel/UserModel.js');

const server = express()

server.use(bodyParser.json());

server.get('/', function(req, res) {
  res.status(200).json( {message: 'API running'} );
});


//code to create a user
server.post('/users', (req, res) => {
	const userInformation = req.body;

	const user = new User(userInformation);

	user.save() //this returns a promise
	  .then((newUser) => {
        res.status(201).json(newUser);
	  })
	  .catch((error) => {
        res.status(500).json({ error: "there  was an error while saving the user to the data base" });
	  });
});

server.get('/users', (req, res) => {
	User.find({ }) //when its an empty object it will get  an array of all the users
	.then((users) => {
		res.status(200).json(users)
	})
	.catch(() => {
		res.status(500).json({error: 'the information cannot be retrieved'});
	})

})

server.get('/users/:id', (req, res) => {
	const { id } = req.params;

	User.findById(id) 
	  .then((user) =>{
        res.status(200).json(user)
	  })
	  .catch((error) => {
        res.status(500).json({error: 'the information cannot be retrieved'});
	  })
})

server.delete('/users/:id', (req, res) => {
	const id  = req.params.id;

	User.findByIdAndRemove(id)
	  .then((user) => {
        res(200).json({ message: 'User deleted!'});
	  })
	  .catch((error) => {
        res.status(500).json({message: 'the information cannot be deleted cuz its invalid', error});
	  })
} )

//db related plumbing code we did this code first to connect to mongoose etc.
mongoose.Promise = global.Promise; //this line overrides the built in mongoose promise implementation and use the native javascript promise 

mongoose
	.connect('mongodb://localhost:27017/users', { useMongoClient: true})
	.then( function() {
		server.listen(5000, function() {
       console.log('Your dataBase is mine DAWG!')
});
	})
	.catch( function(error) {
		console.log('Database connection failed')
	});
