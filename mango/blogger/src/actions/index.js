import axios from 'axios';

export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';

const url = 'http://localhost:3000/api/blog';

export const getPosts = () => {
  const posts = axios.get(url);
  return {
    type: GET_POSTS,
    payload: posts,
  }
};