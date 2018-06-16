import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export default class Greetings extends Component {
  state = {
    show: true
  };

  render = () => (
    <div>
      <Helmet>
        <meta name="title" content="React SSR Greetings" />
      </Helmet>
      <div>That comes from React Greetings!</div>
      {this.state.show && <div>Hello!</div>}
      <button onClick={() => this.setState({ show: !this.state.show })}>
        Toggle message!
      </button>
      <Link to="/counter">To Counter!</Link>
    </div>
  );
}
