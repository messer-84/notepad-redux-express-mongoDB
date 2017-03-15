import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './rootReducer'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
// help us to see all states changes during redux working flow
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider} from 'react-redux';
import {BrowserRouter,} from 'react-router-dom';


// Store to store the stats which we need to keep track of
const store = createStore(
  // combianed Reducer
  rootReducer,
  // Redux Thunk middleware allows you to write action creators that return a function instead of an action.
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  // wrap router (BrowserRouter) for all components then we can switch between pages
  <BrowserRouter>
    <Provider store={store}>
      <App/>

    </Provider>
  </BrowserRouter>,
  document.getElementById('root'));
