import { User, Post } from '../../models';
import { handleUserError } from '../../app';

export const postUser = (req, res) => {
  console.log('======/users | POST======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Data: ${JSON.stringify(req.body)}`);
  const { username, email, password, first_name, last_name, bio } = req.body;
  const missing = [];
  if (username == null)
    missing.push('username');
  if (email == null)
    missing.push('email');
  if (password == null)
    missing.push('password');
  if (first_name == null)
    missing.push('first_name');
  if (last_name == null)
    missing.push('last_name');
  if (missing.length > 0)
    return handleUserError({ error: 'You are missing some real serious data.', missing }, res);

  const user = new User({ username, email, password, first_name, last_name, bio });
  user.save((err, newUser) => {
    if (err)
      return handleUserError(err, res);
    res.json(newUser);
  });
}

export const postPost = (req, res) => {
  console.log('======/posts | POST======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Data: ${JSON.stringify(req.body)}`);
  const { author, title, content, tags } = req.body;
  const missing = [];
  if (author == null)
    missing.push('author');
  if (title == null)
    missing.push('title');
  if (content == null)
    missing.push('content');
  if (missing.length > 0)
    return handleUserError({ error: 'You are missing some real serious data.', missing }, res);

  const post = new Post({ author, title, content, tags });
  post.save((err, newPost) => {
    if (err)
      return handleUserError(err, res);
    res.json(newPost);
  });
}
