import axios from 'axios';
export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const FETCHED_FRIENDS = 'FETCHED_FRIENDS';
export const ERROR_FETCHING = 'ERROR_FETCHING';
export const FETCH_FRIEND = 'FETCH_FRIEND';
export const ADD_FRIEND = 'ADD_FRIEND';
export const ERROR_ADDING = 'ERROR_ADDING';

export const getFriends = () => {
    const friends = axios.get(`http://localhost:5000/api/friends/`);
    return dispatch => {
      dispatch({ type: FETCH_FRIENDS });
      friends
        .then(response => {
          dispatch({
            type: FETCHED_FRIENDS,
            payload: response.data
          });
        })
        .catch(err => {
          dispatch({
            type: ERROR_FETCHING,
            payload: 'ERROR Fetching Friends'
          });
        });
    };
  };

export const getFriend = id => {
  const friend = axios.get(`http://localhost:5000/api/friends/${id}`);
  return dispatch => {
    friend
      .then(response => {
        console.log(response)
        dispatch({ 
          type: FETCH_FRIEND, 
          payload: response.data
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
}

export const addFriend = data => {
    const friends = axios.post(`http://localhost:5000/api/friends`, data);
      return dispatch => {
        friends
        .then(response=> {
          dispatch({ type: ADD_FRIEND, payload: response.data })
        })
        .catch(err => {
          dispatch({
            type: ERROR_ADDING,
            payload: 'ERROR adding friend'
          });
        });
      };
  };