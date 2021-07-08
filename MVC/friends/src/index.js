import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import classes from './index.css';
import App from './Containers/App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import friendsReducer from './Reducers'
export const store = createStore(friendsReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));
