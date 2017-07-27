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

app.get('/users', (req, res) => {
    User.find((err, users) => {
        if (users.length > 0) res.send(users)
        else if (err) res.status(400).send(err)
        else res.status(400).send({ error: 'No users found' })
    })
})
app.get('/users/:id', (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (user) res.send(user)
        else if (err) res.status(400).send(err)
        else res.status(400).send({ error: 'User not found' })
    })
})

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save((err, newUser) => {
        if (err) res.status(400).send(err)
        else res.status(201).send(newUser)
    })
})
app.delete('/users/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) res.status(400).send(err)
        else if (user) res.sendStatus(200)
        else res.status(400).send({ error: 'User not found' })
    })
})

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


mongoose.connect('mongodb://lscspcuser:lscspcuser@ds028310.mlab.com:28310/ls-cs-precourse', {
    useMongoClient: true,
    promiseLibrary: global.Promise
}, () => {
    console.log('DB connected')
    app.listen(3000, () => { console.log('Server running on port 3000') })
})