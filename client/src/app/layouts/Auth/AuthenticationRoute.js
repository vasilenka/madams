import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';

const AuthenticationRoute = ({ children, history }) => {
  if (!window.localStorage.getItem('token')) {
    history.replace('/login');
  }
  return <Switch>{children}</Switch>;
};

export default AuthenticationRoute;
