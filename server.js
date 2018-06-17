import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import thunk from 'redux-thunk';

import ReactRoot from './src/index';

import messageReducerConstructor from './src/reducers/message';
import postsReducerConstructor from './src/reducers/posts';

import { fetchPosts } from './src/actions/posts';

export default async path => {
  const store = createStore(
    combineReducers({
      message: messageReducerConstructor({
        platform: 'server',
        initialState: { text: 'Hello from the server!' }
      }),
      posts: postsReducerConstructor({
        platform: 'server',
        initialState: []
      })
    }),
    applyMiddleware(thunk)
  );

  await store.dispatch(fetchPosts());

  const preloadedState = store.getState();

  const reactHtml = renderToString(
    <Provider store={store}>
      <StaticRouter location={path} context={{}}>
        <ReactRoot />
      </StaticRouter>
    </Provider>
  );

  const helmet = Helmet.renderStatic();

  return `
    <html>
      <head>
        ${helmet.meta.toString()}
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <div>
          That is part of the original html!
        </div>
        <script>window.__PRELOADED_STATE__ = ${JSON.stringify(
          preloadedState
        ).replace(/</g, '\\u003c')}</script>
        <script src="/assets/js/bundle.js"></script>
      </body>
    </html>
  `;
};
