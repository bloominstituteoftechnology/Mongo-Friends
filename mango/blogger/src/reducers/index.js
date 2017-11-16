import { combineReducers } from 'redux';

import posts from './postsReducer.js';

const rootReducer = combineReducers({
  posts
});

export default rootReducer;