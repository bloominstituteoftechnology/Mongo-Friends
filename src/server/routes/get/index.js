import { User, Post } from '../../models';
import { handleUserError } from '../../app';

export const getUsers = (req, res) => {
  console.log('======/users | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  const users = []
  User.find().exec((err, data) => {
    if (data != null)
      data.forEach(user => users.push(user));
    if (users.length === 0)
      return res.send({ umm: "Well... This is awkward." });
    res.send({users});
  });
}

export const getUserByID = (req, res) => {
  console.log('======/users/:id | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Params: ${JSON.stringify(req.params)}`);
  User.findOne().where('_id').equals(req.params.id).exec((err, data) => {
    if (data != null)
      return res.send(data);
    handleUserError({ error: "If you think they're a real person now, I promise they're still in you're head. Get some real friends." }, res);
  });
}

export const getPosts = (req, res) => {
  console.log('======/posts | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  const posts = []
  Post.find().exec((err, data) => {
    if (data != null)
      data.forEach(post => posts.push(post));
    if (posts.length === 0)
      return res.send({ umm: "Well... This is awkward." });
    res.send({posts});
  });
}

export const getPostByID = (req, res) => {
  console.log('======/posts/:id | GET======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Params: ${JSON.stringify(req.params)}`);
  Post.findOne().where('_id').equals(req.params.id).exec((err, data) => {
    if (data != null)
      return res.send(data);
    handleUserError({ error: "LOL! Who told you to look that up?" }, res);
  });
}
