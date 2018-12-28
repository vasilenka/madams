module.exports = app => {
  app.use('/', require('./home'));
  app.use('/auth', require('./auth'));
  app.use('/users', require('./users'));
  app.use('/projects', require('./projects'));
};
