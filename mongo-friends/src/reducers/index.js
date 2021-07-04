import { FETCH_FRIENDS, FETCHED_FRIENDS, ERROR_FETCHING, FETCH_FRIEND, ADD_FRIEND, ERROR_ADDING } from '../actions';

const initialState = {
   friends: [],
   friend: {},
   fetchingFriends: false,
   fetchFriend: false,
   addingFriend: false,
   error: null
}

export const rootReducer = (state = initialState, action) => {
  switch(action.type) {

    case FETCH_FRIENDS:
      return Object.assign({}, state, { 
        fetchingFriends: true 
      });

    case FETCHED_FRIENDS:
      return Object.assign({}, state, {
        friends: [ ...action.payload ],
        fetchingFriends: false,
        error: null
      });

    case ERROR_FETCHING:
      return Object.assign({}, state, {
        error: action.payload
      });

    case FETCH_FRIEND:
      return Object.assign({}, state, {
        friend: action.payload,
        fetchFriend: true
      });

      case ADD_FRIEND:
      return Object.assign({}, state, {
        friends: [...action.payload],
        addingFriend: true,
        error: null
    });

    case ERROR_ADDING:
      return Object.assign({}, state, {
        error: action.payload,
    });

    default:
      return state;
    }
};

export default rootReducer;