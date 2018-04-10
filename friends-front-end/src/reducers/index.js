import { initState } from './initState.js';

export default (state = initState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
