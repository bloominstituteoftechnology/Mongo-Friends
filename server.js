const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./Users/UsersModel');

const server = express();
const port = 5000;
server.use(bodyParser.json());

server.get('/', (req,res)=>{
    res.status(200).json({message: 'Api Running'});
});

// Begin Users Routes and Requests ----------------------------
server.post('/users', (req,res)=>{
    const userInformation = req.body;
    const user = new User(userInformation);

    if(!userInformation.userName || !userInformation.password || !userInformation.email) {
        res.status(400).json({error: 'Please provide username, password, and email'});
    } else {
        user
            .save()
            .then(newUser =>{
                res.status(201).json(newUser);
            })
            .catch(err =>{
                res.status(500).json({error: 'There was an error while saving the user'});
            });
    }
});

server.get('/users', (req,res)=>{
    User
        .find({})
        .then(users =>{
            res.status(200).json(users);
        })
        .catch(err =>{
            res.status(500).json({ error: 'The imformation could not be retrieved' });
        });
});

server.get('/users/:id', (req,res)=>{
    const {id} = req.params;
    User
        .findById(id)
        .then(user=>{
            res.status(200).json(user);
        })
        .catch(err=>{
            res.status(500).json({error: 'The information could not be retrieved'});
        });
});

server.delete('/users/:id', (req,res)=>{
    const {id} = req.params;
    User
        .findByIdAndRemove(id)
        .then(user=>{
            res.status(200).json({Sucess: user.id});
        })
        .catch(err=>{
            res.status(500).json({error: 'The information could not be deleted'});
        });
});
// End Users Routes and Requests ----------------------------

mongoose.Promise = global.Promise;
mongoose
    .connect('mongodb://localhost/users', {useMongoClient: true})
    .then(()=>{
        server.listen(port, ()=>{
            console.log('Server is now listening on port: ', port);
        });
    })
    .catch(err=>{
        console.log('Database Connection Failed!');
    })

