import * as actions from '../Actions/friendActions';

const init = {friends: []}

const friendsReducer = (state = init, action) => {
  switch(action.type){
    case actions.GETFRIENDS:
      return Object.assign({}, state, {friends:[...action.payload]});
    default:
      return state;
  }
}
export default friendsReducer;
