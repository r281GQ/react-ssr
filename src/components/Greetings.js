import React, { Component } from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const PrimaryButton = styled.button`
  background-color: #1c1084;
  font-size: 30px;
`;

class Greetings extends Component {
  state = {
    show: true,
    showFetchedData: false
  };

  render = () => {
    const { show, showFetchedData } = this.state;
    const { posts } = this.props;

    return (
      <div>
        <Helmet>
          <meta name="title" content="React SSR Greetings" />
        </Helmet>
        {showFetchedData && (
          <div>{posts.map(({ id, title }) => <div key={id}>{title}</div>)}</div>
        )}
        <button
          onClick={() =>
            this.setState(({ showFetchedData }) => ({
              showFetchedData: !showFetchedData
            }))
          }
        >
          {`${showFetchedData ? `Hide` : `Show`} fetched data`}
        </button>
        <div>That comes from React Greetings!</div>
        {show && <div>Hello!</div>}
        <PrimaryButton
          onClick={() => this.setState(({ show }) => ({ show: !show }))}
        >
          Toggle message!
        </PrimaryButton>
        <Link to="/counter">To Counter!</Link>
        <Link to="/apolloUsers">To Counter!</Link>
      </div>
    );
  };
}

export default connect(({ posts }) => ({ posts }))(Greetings);
