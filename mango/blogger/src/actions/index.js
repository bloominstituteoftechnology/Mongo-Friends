import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

const url = 'http://localhost:3000/api/blog';

export const getPosts = () => {
  const posts = axios.get(url);
  return {
    type: GET_POSTS,
    payload: posts,
  }
};
export const getPost = (id) => {
  const post = axios.get(`${url}/${id}`);
  return {
    type: GET_POST,
    payload: post,
  }
};
export const addPost = (post) => {
  const newPost = axios.post(url, post)
    .then(getPosts);
  /*
  return {
    type: ADD_POST,
    payload: newPost,
  }
  */
  return newPost;
};
export const deletePost = (id) => {
  const confirmation = axios.delete(url, { data: { id }, })
    .then(getPosts);
  /*
  return {
    type: DELETE_POST,
    payload: confirmation,
  }
  */
  return confirmation;
};
