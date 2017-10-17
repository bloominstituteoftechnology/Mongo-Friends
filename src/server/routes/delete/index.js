import { User, Post } from '../../models';
import { handleUserError } from '../../app';

export const deleteUserByID = (req, res) => {
  console.log('======/users/:id | DELETE======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Params: ${JSON.stringify(req.params)}`);
  User.findOne().where('_id').equals(req.params.id).exec((err, data) => {
    if (data != null) {
      return User.deleteOne(data).then((err, result) => res.send({action: 'DELETE', user: data, result})); 
    }
    handleUserError({ error: "I really wanted to delete them, but they aren't even real. I am disappoint :(" }, res);
  });
}

export const deletePostByID = (req, res) => {
  console.log('======/posts/:id | DELETE======');
  console.log(`  Request: ${req.originalUrl}`);
  console.log(`  From: ${req.headers.origin}`);
  console.log(`  Params: ${JSON.stringify(req.params)}`);
  Post.findOne().where('_id').equals(req.params.id).exec((err, data) => {
    if (data != null) {
      return Post.deleteOne(data).then((err, result) => res.send({action: 'DELETE', post: data, result})); 
    }
    handleUserError({ error: "Sorry, couldn't find it. :( Loser." }, res);
  });
}
