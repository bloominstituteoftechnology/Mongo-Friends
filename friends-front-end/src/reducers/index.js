import { initState } from './initState.js';

import { RETRIEVE } from '../actions/retrieve';

export default (state = initState, action) => {
  switch (action.type) {
    case RETRIEVE:
      if (action.error) return { ...state, error: action.error };
      return { ...state, friends: action.payload };
    default:
      return state;
  }
};
