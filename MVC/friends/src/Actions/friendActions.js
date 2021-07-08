import axios from 'axios';


export const GETFRIENDS = 'GETFRIENDS';
export const CREATEFRIEND = 'CREATEFRIEND';


export const getFriends = () => {
  const promise = axios.get('http://localhost:5000/api/friends');
  return dispatch => {
    promise
      .then(response => {
        dispatch({type: GETFRIENDS, payload: response.data});
      })
  }
}


export const createFriend = (friend) => {
  const promise = axios.post(`http://localhost:5000/api/friends`, friend);
  return dispatch => {
    promise
      .then(response => {
        dispatch({type: CREATEFRIEND, payload: response.data});
      })
      .catch(err => {
        console.log(err);
      })
  }
}
