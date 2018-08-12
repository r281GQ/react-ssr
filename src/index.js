import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Counter from './components/Counter';
import Greetings from './components/Greetings';
import NotFound from './components/NotFound';
import ApolloUsers from './components/ApolloUsers';

export default class Routes extends Component {
  render = () => {
    return (
      <Switch>
        <Route path="/" exact component={Greetings} />
        <Route path="/counter" component={Counter} />
        <Route path="/apolloUsers" component={ApolloUsers} />
        <Route exact component={NotFound} />
      </Switch>
    );
  };
}
