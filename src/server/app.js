// npm modules
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

/* === Models === */
import { User, Post } from './models';

/* === Routes === */
import { getUsers, getUserByID, getPosts, getPostByID } from './routes';
import { postUser, postPost } from './routes';
import { deleteUserByID, deletePostByID } from './routes';

const STATUS_USER_ERROR = 422;
const PORT = 3000;

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mongoi', { useMongoClient: true });

app.use(bodyParser.json());
app.use(express.static('public', {
  index: false
}));

app.get('/', (req, res) => res.redirect('/posts'));
app.get('/users', getUsers);
app.get('/users/:id', getUserByID);
app.post('/users', postUser);
app.delete('/users/:id', deleteUserByID);

app.get('/posts', getPosts);
app.get('/posts/:id', getPostByID);
app.post('/posts', postPost);
app.delete('/posts/:id', deletePostByID);

app.listen(PORT);
console.log(`Server running at http:/localhost/:${PORT}`);

export default app;

export const handleUserError = (message, res) => {
  res.status(STATUS_USER_ERROR).send(message);
};
