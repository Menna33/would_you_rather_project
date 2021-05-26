import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import store from './store';     //////////////???????????????????
//0import router from './router';      //////////////???????????????????
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import App from './components/App'
import { BrowserRouter as Router } from 'react-router-dom';

// Provider is a top-level component that wrapps our entire application, including
// the Router. We pass it a reference to the store so we can use react-redux's
// connect() method for Component Containers.
const store = createStore(reducer,middleware)
ReactDOM.render(
  <Provider store={store}> 
  <Router>
   <App />
   </Router>
   </Provider>,
  document.getElementById('root')
);