import { GET_POSTS, ADD_POST, } from '../actions';

export default (posts = [], action) => {
  switch (action.type) {
    case GET_POSTS:
      console.log(action.payload);
      return action.payload.data;
    default:
      return posts;
  }
}