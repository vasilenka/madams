const graphql = require('graphql');
const {
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const AuthorType = require('./Author');

const books = require('../dummy/books');
const authors = require('../dummy/authors');

const ClientType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
    // author: {
    //   type: AuthorType,
    //   resolve(parent, args) {
    //     return authors.find(author => author.id == parent.authorId);
    //   }
    // }
  })
});

module.exports = ClientType;
