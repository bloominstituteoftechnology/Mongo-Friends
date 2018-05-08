import axios from 'axios';
export const GETFRIENDS = 'GETFRIENDS';

export const getFriends = () => {
  const promise = axios.get('http://localhost:5000/api/friends');

  return dispatch => {
    promise
      .then(response => {
        dispatch({type: GETFRIENDS, payload: response.data});
      })
  }
}
