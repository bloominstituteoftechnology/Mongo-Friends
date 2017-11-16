const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Users = require('./models/Users');


const STATUS_CODES = {
    USER_ERROR: 422,
    SERVER_ERROR: 500,
    SUCCESS: 200,
    CREATED_SUCCESS: 201,
}

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send("Hello World"));

app.get('/users', (req, res) => {

    
    Users.find((error, users) => {
        if (error) {
            res.status(STATUS_CODES.USER_ERROR).json({error});
            return;
        }
        res.status(STATUS_CODES.SUCCESS).json({ users });
    });


})
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    if(id === undefined) {
        res.status(STATUS_CODES.USER_ERROR).json({ error: 'You must provide an id'});
        return;
    }
    Users.findOne({ _id: id}, (error, user) => {
        if(error) {
            res.status(STATUS_CODES.USER_ERROR).json({error});            
        } else {
            res.status(STATUS_CODES.SUCCESS).json({user});
        }
    });
});
app.post('/users/', (req, res) => {
    const { username, email } = req.body;
    if(!username || !email) {
        res.status(STATUS_CODES.USER_ERROR).json({ error: 'You must include both Username && Email'});
        return;
    }
    const user = new Users({username, email});
    user.save((error, user) => {
        if(error) {
            res.status(STATUS_CODES.USER_ERROR).json({error});
        } else {
            res.status(STATUS_CODES.CREATED_SUCCESS).json({user});
        }
    })
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    if(id === undefined) {
        res.status(STATUS_CODES.USER_ERROR).json({ error: 'You must provide an id'});
        return;
    }
    Users.remove({ _id: id }, (error) => {
        if(error) {
            res.status(STATUS_CODES.USER_ERROR).json({ error });
            return;
        }
        res.status(STATUS_CODES.SUCCESS).json({ 'success': 'ok' });
        return ;
    });
    return;
});

mongoose.Promise = global.Promise;
const connect = mongoose.connect(
  'mongodb://localhost/users',
  { useMongoClient: true }
);

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