import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

class Counter extends Component {
  state = {
    count: 0
  };

  render = () => {
    const { count } = this.state;
    const { message } = this.props;

    return (
      <div>
        <Helmet>
          <meta name="title" content="React SSR Counter!" />
        </Helmet>
        <div>{message}</div>
        <div>That comes from React Counter!</div>
        <button
          onClick={() =>
            this.setState(({ count }) => ({
              count: count + 1
            }))
          }
        >
          {count}
        </button>
      </div>
    );
  };
}

export default connect(state => ({ message: state.message.text }))(Counter);
