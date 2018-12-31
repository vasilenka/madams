const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

module.exports = app =>
  app.use(
    '/graphql/',
    graphqlHTTP({
      schema,
      graphiql: true,
      formatError: error => ({
        message: error.message,
        locations: error.locations,
        stack: error.stack ? error.stack.split('\n') : [],
        path: error.path
      })
    })
  );
