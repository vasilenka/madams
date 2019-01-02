import React, { useEffect, useState } from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import Header from '../../docs/Header/Header';

const getProjectQuery = gql`
  query($id: ID) {
    project(id: $id) {
      id
      name
    }
  }
`;

const ProjectPage = props => {
  const [current, setCurrent] = useState(null);

  useEffect(
    () => {
      if (!props.data.loading && !props.data.error) {
        setCurrent(props.data.project);
      }
    },
    [props.data]
  );

  return (
    <React.Fragment>
      <Header
        title={current ? current.name : ''}
        description={current ? current.id : ''}
      />
    </React.Fragment>
  );
};

export default graphql(getProjectQuery, {
  options: props => {
    return {
      variables: {
        id: props.match.params.id
      }
    };
  }
})(ProjectPage);
