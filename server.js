const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())


const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})
const User = mongoose.model('User', UserSchema)

// * [GET] `/users` This route will return an array of all users.
app.get('/users', (req, res) => {
    User.find()
        .catch(error => res.status(500).json({ error }))
        .then(users => res.send(users.reduce((obj, user) => {
            obj[user.id] = user;
            return obj
        }, {})))
})

// * [GET] `/users/:id` This route will return the user with the
// matching `id` (`_id` on the db document) property.
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .catch(error => res.status(500).json({ error }))
        .then(user => res.json(user))
})

// * [POST] `/users` This route should save a new user to the server.
app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save()
        .catch(error => res.status(500).json({ error }))
        .then(user => res.json(user))
})

// * [DELETE] `/users/:id` This route should delete the specified user.
app.delete('/users/:id', (req, res) => {
    console.log(req.params.id)
    User.findByIdAndRemove(req.params.id)
        .catch(error => res.status(500).json({ error }))
        .then(() => res.sendStatus(200))
})

// ## Extra Credit
const PostSchema = new mongoose.Schema({
    user: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true }
})
const Post = mongoose.model('Post', PostSchema)

app.get('/posts', (req, res) => {
    Post.find((err, posts) => {
        if (posts.length > 0) res.send(posts)
        else if (err) res.status(400).send(err)
        else res.status(400).send({ error: 'No posts found' })
    })
})
app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (post) res.send(post)
        else if (err) res.status(400).send(err)
        else res.status(400).send({ error: 'Post not found' })
    })
})
app.post('/posts', (req, res) => {
    const post = new Post(req.body)
    post.save((err, newPost) => {
        if (newPost) res.status(201).send(newPost)
        else if (err) res.status(400).send(err)
    })
})
app.delete('/posts/:id', (req, res) => {
    Post.findByIdAndRemove(req.params.id, (err, post) => {
        if (post) res.sendStatus(200)
        else if (err) res.status(400).send(err)
        else res.status(400).send({ error: 'User not found' })
    })
})



mongoose.Promise = global.Promise;
const connect = mongoose.connect(
    'mongodb://lscspcuser:lscspcuser@ds028310.mlab.com:28310/ls-cs-precourse', 
    {
        useMongoClient: true,
        promiseLibrary: global.Promise
    }
);

const port = 3000;
connect
    .catch(error => console.log("ERROR: Couldn't connect to MongoDB. Do you have it running?"))
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`)
        })
    })