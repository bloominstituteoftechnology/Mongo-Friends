import axios from 'axios';
export const RETRIEVE = 'RETRIEVE';

export const retrieve = () => dispatch => {
  axios
    .get('http://localhost:5000/api/friends')
    .then(response => {
      console.log('action completed');
      console.log(response.data);
      dispatch({ type: RETRIEVE, payload: response.data });
    })
    .catch(error => {
      console.log('action failed');
      dispatch({ type: RETRIEVE, error: error });
    });
  return { type: RETRIEVE };
};
