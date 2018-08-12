import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    users {
      id
    }
  }
`;

export default () => (
  <Query query={query}>
    {({ data, loading }) => {
      if (!loading && data) {
        return (
          <div>
            {data.users.map(item => <div key={item.id}>{item.id}</div>)}
          </div>
        );
      }

      return null;
    }}
  </Query>
);
