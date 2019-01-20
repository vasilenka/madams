import React, { useEffect } from 'react';
import styles from './App.module.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Text from './components/Text/Text';
import Brand from './components/Brand/Brand';
import List from './components/List/List';

import { projectAll } from './actions/ProjectAction';
import { userAll } from './actions/UserAction';

const AppRoute = props => {
  let users = props.users.list;
  let projects = props.projects.list;

  console.log(props);

  useEffect(
    () => {
      props.project.all();
      props.user.all();
    }, []
  )

  const routeGroup = [
    {
      routes: [{ name: 'Dashboard', path: '/' }]
    },
    {
      title: 'Projects',
      routes: projects
        .map(project => ({
          name: project.name,
          path: `/projects/${project.id}`
        }))
    },
    {
      title: 'Meridians',
      routes: users.map(user => ({
        name: user.username,
        path: `/users/${user.id}`
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
    <div>
      <Brand />
      <div className={styles.list}>
        {routeGroup.map((group, groupIndex) => {
          return (
            <div key={groupIndex} className={styles.sidebarSection}>
              {group.title && (
                <Text heading6 component="h3" className={styles.sidebarTitle}>
                  {group.title}
                </Text>
              )}
              {group.routes.map((route, routeIndex) => {
                return (
                  <List key={routeIndex}>
                    <Link to={route.path}>
                      <Text truncate className={styles.link}>
                        <Text small style={{ color: 'rgba(255,255,255,.40)' }}>
                          #
                        </Text>
                        {route.name.toLowerCase()}
                      </Text>
                    </Link>
                  </List>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownState) => {
  return {
    projects: state.projects,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    project : {
      all : projectAll(dispatch)
    },
    user : {
      all : userAll(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);
