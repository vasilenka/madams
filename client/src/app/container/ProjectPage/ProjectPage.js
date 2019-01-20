import React, { useEffect, useState } from 'react';
import { graphql, compose } from 'react-apollo';
import { gql } from 'apollo-boost';
import Header from '../../docs/Header/Header';
import ProjectLog from './ProjectLog';

const ProjectPage = props => {
  const [current, setCurrent] = useState(null);
  // const [msgBody, setMsgBody] = useState('');
  // const [senderId, setSenderId] = useState('');

  useEffect(
    () => {
      if (!props.data.loading && !props.data.error) {
        setCurrent(props.data.project);
      }
    },
    [props.data]
  );

  // async function sendMessage(e) {
  //   e.preventDefault();
  //   if (!current) return;
  //   if (!msgBody || !senderId) return;
  //   await props.addMessageMutation({
  //     variables: {
  //       body: msgBody,
  //       senderId: senderId,
  //       projectId: current.id
  //     },
  //     refetchQueries: [
  //       {
  //         query: getProjectQuery,
  //         variables: {
  //           id: props.match.params.id
  //         }
  //       }
  //     ]
  //   });
  //   setMsgBody('');
  //   setSenderId('');
  // }

  return (
    <React.Fragment>
      <Header
        title={current ? current.name : ''}
        description={current ? current.id : ''}
      />

      {/* <ul>
        {(current ? current.messages : []).map(message => (
          <li key={message.id}>
            {message.sender.username} - {message.body}
          </li>
        ))}
      </ul>

      <form>
        <input
          value={msgBody}
          onChange={e => setMsgBody(e.target.value)}
          placeholder="message..."
        />
        <br />
        <input
          value={senderId}
          onChange={e => setSenderId(e.target.value)}
          placeholder="senderId..."
        />
        <br />
        <button onClick={sendMessage}>Send</button>
      </form> */}
      <ProjectLog />
    </React.Fragment>
  );
};

const getProjectQuery = gql`
  query($id: ID) {
    project(id: $id) {
      id
      name
      messages {
        id
        body
        sender {
          username
        }
      }
    }
  }
`;

const addMessageMutation = gql`
  mutation($body: String!, $projectId: ID!, $senderId: ID!) {
    addMessage(body: $body, senderId: $senderId, projectId: $projectId) {
      id
    }
  }
`;

export default compose(
  graphql(getProjectQuery, {
    options: props => {
      return {
        variables: {
          id: props.match.params.id
        }
      };
    }
  }),
  graphql(addMessageMutation, { name: 'addMessageMutation' })
)(ProjectPage);
