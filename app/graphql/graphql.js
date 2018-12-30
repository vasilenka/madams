const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

module.exports = app =>
  app.use('/graphql/', graphqlHTTP({ schema, graphiql: true }));
