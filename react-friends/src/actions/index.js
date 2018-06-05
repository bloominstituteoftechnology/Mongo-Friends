import axios from "axios";

export const PENDING_FRIENDS = "PENDING_FRIENDS";
export const SUCCESS_FRIENDS = "SUCCESS_FRIENDS";
export const ERROR_FRIENDS = "ERROR_FRIENDS";
/*
  For this project you'll need at least 2 action creators for the main portion,
   and 2 more for the stretch problem.
   Be sure to include action types for each type of action creator. Also, be sure to mind
     the "pending" states like, fetching, creating, updating and deleting.
   C - addFriend
   R - getFriends
   U - updateFriend
   D - deleteFriend
*/
export const fetchFriends = () => {
  const friends = axios.get("http://localhost:5000/friends");
  return dispatch => {
    dispatch({ type: PENDING_FRIENDS });
    friends
      .then(response => {
        console.log(response);
        dispatch({ type: SUCCESS_FRIENDS, payload: response.data });
      })
      .catch(err => {
        dispatch({
          type: ERROR_FRIENDS,
          payload: "Something went wrong with fetching Friends"
        });
      });
  };
};

export const createFriend = data => {
  const friends = axios.post("http://localhost:5000/friends", data);
  return dispatch => {
    dispatch({ type: PENDING_FRIENDS });
    friends
      .then(response => {
        console.log(response);
        dispatch({ type: SUCCESS_FRIENDS, payload: response.data });
      })
      .catch(err => {
        dispatch({
          type: ERROR_FRIENDS,
          payload: "Something went wrong with posting friend"
        });
      });
  };
};

export const terminateFriend = _id => {
  const friends = axios.delete(`http://localhost:5000/friends/${_id}`);
  return dispatch => {
    dispatch({ type: PENDING_FRIENDS });
    friends
      .then(response => {
        console.log(response);
        dispatch({ type: SUCCESS_FRIENDS, payload: response.data.removedFriend });
      })
      .catch(err => {
        dispatch({
          type: ERROR_FRIENDS,
          payload: "Something went wrong with deleting friend"
        });
      });
  };
}

export const editFriend = (_id, friendObj) => {
  const friends = axios.put(`http://localhost:5000/friends/${_id}`, friendObj);
  return dispatch => {
    dispatch({ type: PENDING_FRIENDS });
    friends
      .then(response => {
        console.log(response);
        dispatch({ type: SUCCESS_FRIENDS, payload: response.data });
      })
      .catch(err => {
        dispatch({
          type: ERROR_FRIENDS,
          payload: "Something went wrong with updating friend"
        });
      });
  };
}