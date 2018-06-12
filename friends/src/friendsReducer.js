import {
  FETCHING_FRIENDS,
  FETCHING_ERROR,
  FETCHING_PENDING
} from "./allActions.js";

const initialState = [];
const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_PENDING:
      return state;
    case FETCHING_FRIENDS:
      console.log("actionPayload", action.payload);
      return (state = action.payload);
    case FETCHING_ERROR:
      return state;
    default:
      return state;
  }
};

export { friendsReducer };
