import React, { useEffect, useState } from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import Header from '../../docs/Header/Header';

const getUserQuery = gql`
  query($id: ID) {
    user(id: $id) {
      id
      username
    }
  }
`;

const UserPage = props => {
  const [current, setCurrent] = useState(null);

  useEffect(
    () => {
      if (!props.data.loading && !props.data.error) {
        setCurrent(props.data.user);
      }
    },
    [props.data]
  );

  return (
    <React.Fragment>
      <Header
        title={current ? current.username : ''}
        description={current ? current.id : ''}
      />
    </React.Fragment>
  );
};

export default graphql(getUserQuery, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id
      }
    };
  }
})(UserPage);
