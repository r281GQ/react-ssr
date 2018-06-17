import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import thunk from 'redux-thunk';

import ReactRoot from './src/index';
import Stripe from './src/utils/Stripe';

import messageReducerConstructor from './src/reducers/message';
import postsReducerConstructor from './src/reducers/message';

// grab the root element from the server rendered html
const rootElement = document.getElementById('root');

// grab the store contents rendered by the server and attached to the html
const { message, posts } = window.__PRELOADED_STATE__;

// initialize the client side store with the server provided data
const store = createStore(
  combineReducers({
    message: messageReducerConstructor({
      platform: 'client',
      initialState: message
    }),
    posts: postsReducerConstructor({
      platform: 'client',
      initialState: posts
    })
  }),
  applyMiddleware(thunk)
);

// for security reasons get rid of the data from the server
delete window.__PRELOADED_STATE__;

// rehydrate the html and let React take over
hydrate(
  <Stripe>
    <Provider store={store}>
      <BrowserRouter>
        <ReactRoot />
      </BrowserRouter>
    </Provider>
  </Stripe>,
  rootElement
);
