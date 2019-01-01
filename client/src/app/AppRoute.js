import React from 'react';
import styles from './App.module.scss';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';

import Text from './components/Text/Text';
import Brand from './components/Brand/Brand';
import List from './components/List/List';

const getDataQuery = gql`
  {
    users {
      id
      username
    }
    projects {
      id
      name
    }
  }
`;

const AppRoute = props => {
  let users = [];
  let projects = [];
  if (!props.data.loading && !props.data.error) {
    users = props.data.users || [];
    projects = props.data.projects || [];
  }

  const routeGroup = [
    {
      routes: [{ name: 'Dashboard', path: '/' }]
    },
    {
      title: 'Meridians',
      routes: users.map(user => ({
        name: user.username,
        path: `/users/${user.id}`
      }))
    },
    {
      title: 'Projects',
      routes: projects.map(project => ({
        name: project.name,
        path: `/projects/${project.id}`
      }))
    },
    {
      title: 'Components',
      routes: [
        { name: 'Text', path: '/text' },
        { name: 'Textfield', path: '/textfield' }
      ]
    }
  ];

  return (
    <React.Fragment>
      <Brand />
      <div className={styles.list}>
        {routeGroup.map((group, groupIndex) => {
          return (
            <React.Fragment key={groupIndex}>
              {group.title && (
                <List>
                  <Text heading6 component="h3" className={styles.sidebarTitle}>
                    {group.title}
                  </Text>
                </List>
              )}
              {group.routes.map((route, routeIndex) => {
                return (
                  <List>
                    <Link key={routeIndex} to={route.path}>
                      <Text truncate className={styles.link}>
                        <Text small style={{ color: 'rgba(255,255,255,.40)' }}>
                          #
                        </Text>
                        {route.name}
                      </Text>
                    </Link>
                  </List>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default graphql(getDataQuery)(AppRoute);
