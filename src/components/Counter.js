import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class Counter extends Component {
  state = {
    count: 0
  };

  render = () => {
    return (
      <div>
        <Helmet>
          <meta name="title" content="React SSR Counter!" />
        </Helmet>
        <div>{this.props.message}</div>
        <div>That comes from React Counter!</div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          {this.state.count}
        </button>
      </div>
    );
  };
}

export default connect(state => ({ message: state.message.text }))(Counter);
