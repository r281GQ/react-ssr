import React from 'react';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { StaticRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';
import thunk from 'redux-thunk';

import ReactRoot from './src/index';
import Stripe from './src/utils/Stripe';

import messageReducerConstructor from './src/reducers/message';
import postsReducerConstructor from './src/reducers/posts';

import { fetchPosts } from './src/actions/posts';

// it will be called from express, needs to be async because of the async action creators
export default async path => {
  // create a server side store
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

  const { dispatch, getState } = store;

  // manually dispatch an ajax request
  await dispatch(fetchPosts());

  // get the contents of the store and serialize it to prevent cross site scripting
  const preloadedState = serialize(getState());

  const sheet = new ServerStyleSheet();

  // render html markup with styled components to collect all the style info
  const reactHtml = renderToString(
    sheet.collectStyles(
      <Stripe>
        <Provider store={store}>
          <StaticRouter location={path} context={{}}>
            <ReactRoot />
          </StaticRouter>
        </Provider>
      </Stripe>
    )
  );

  // create styles tags based on the rendered markup
  const styles = sheet.getStyleTags();

  // create meta tags based on the rendered markup
  const helmet = Helmet.renderStatic();

  // inject React markup and Helmet tags to base html
  // append redux store contents to the window object so the client can access
  return `
    <html>
      <head>
        ${helmet.meta.toString()}
        ${styles}
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <div>
          That is part of the original html!
        </div>
        <script>window.__PRELOADED_STATE__ = ${preloadedState}</script>
        <script src="/assets/js/bundle.js"></script>
      </body>
    </html>
  `;
};
