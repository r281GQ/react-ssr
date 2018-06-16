import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Counter from './components/Counter';
import Greetings from './components/Greetings';

export default () => (
  <Switch>
    <Route path="/counter" exact component={Counter} />
    <Route path="/" exact component={Greetings} />
  </Switch>
);
