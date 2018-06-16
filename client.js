import React from 'react';
import ReactDom from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ReactRoot from './src/index';

import messageReducerConstructor from './src/reducers/message';

const rootElement = document.getElementById('root');

const { message } = window.__PRELOADED_STATE__;

const store = createStore(
  combineReducers({
    message: messageReducerConstructor({
      platform: 'client',
      initialState: message
    })
  })
);

delete window.__PRELOADED_STATE__;

ReactDom.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <ReactRoot />
    </BrowserRouter>
  </Provider>,
  rootElement
);
