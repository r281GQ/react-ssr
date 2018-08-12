import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ApolloLink, concat } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloProvider } from 'react-apollo';

import thunk from 'redux-thunk';

import ReactRoot from './src/index';
import Stripe from './src/utils/Stripe';

import messageReducerConstructor from './src/reducers/message';
import postsReducerConstructor from './src/reducers/message';

// grab the root element from the server rendered html
const rootElement = document.getElementById('root');

// grab the store contents rendered by the server and attached to the html
const { message, posts } = window.__PRELOADED_STATE__;

const authMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }

      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    concat(
      authMiddleware,
      createUploadLink({
        url: `http://localhost:4050/graphql`,
        credentials: 'include'
      })
    )
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

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
delete window.__APOLLO_STATE__;

// rehydrate the html and let React take over
hydrate(
  <Stripe>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <ReactRoot />
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  </Stripe>,
  rootElement
);
