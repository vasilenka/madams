module.exports = app => {
  // REST Routes
  app.use('/', require('./home'));
  app.use('/auth', require('./auth'));
  app.use('/users', require('./users'));
  app.use('/projects', require('./projects'));

  // GRAPHQL Routes
  app.use('/gql/', require('../services/graphql'));
};
