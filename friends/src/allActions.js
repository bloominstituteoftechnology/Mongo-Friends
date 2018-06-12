import axios from "axios";
export const FETCHING_FRIENDS = "FETCHING_FRIENDS";
export const FETCHING_ERROR = "FETCHING_ERROR";
export const FETCHING_PENDING = "FETCHING_PENDING";

const fetchingFriendsActionCreator = () => {
  const promise = axios.get("http://localhost:5000/friends");
  console.log("promise", promise);
  return dispatch => {
    // dispatch({ type: FETCHING_PENDING, payload: null });
    promise
      .then(dispatch({ type: FETCHING_PENDING }))
      .then(response => {
        console.log(response);
        return dispatch({ type: FETCHING_FRIENDS, payload: response.data });
      })
      .catch(error => {
        console.log(error);
        dispatch({ type: FETCHING_ERROR });
      });
  };
};
export { fetchingFriendsActionCreator };
