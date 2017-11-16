import { GET_POSTS, GET_POST, ADD_POST, DELETE_POST, } from '../actions';

export default (posts = [], action) => {
  switch (action.type) {
    case GET_POSTS:
    case GET_POST:
    case ADD_POST:
    case DELETE_POST:
      return action.payload.data;
    default:
      return posts;
  }
}