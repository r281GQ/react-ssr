import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Counter extends Component {
  state = {
    count: 0
  };

  render = () => (
    <div>
      <Helmet>
        <meta name="title" content="React SSR" />
      </Helmet>
      <div>That comes from React!</div>
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    </div>
  );
}
