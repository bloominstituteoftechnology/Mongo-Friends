import axios from "axios";

export const PENDING_FRIENDS = "PENDING_FRIENDS";
export const SUCCESS_FRIENDS = "SUCCESS_FRIENDS";
export const ERROR_FRIENDS = "ERROR_FRIENDS";
/*
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
      .catch(response => {
        dispatch({ type: ERROR_FRIENDS, payload: response.data });
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
      .catch(response => {
        dispatch({
          type: ERROR_FRIENDS, payload: [{
            firstName: "error: " + data.firstName,
            lastName: "error: " + data.lastName,
            age: "error: " + data.age,
          }]
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
        dispatch({ type: SUCCESS_FRIENDS, payload: response.data });
      })
      .catch(response => {
        dispatch({ type: ERROR_FRIENDS, payload: response.data });
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
      .catch(response => {
        dispatch({ type: ERROR_FRIENDS, payload: response.data });
      });
  };
}