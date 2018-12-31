const graphql = require('graphql');

const {
  GraphQLUnionType,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const AuthorType = require('../types/Author');

const books = require('./../dummy/books');
const authors = require('./../dummy/authors');

module.exports = {
  authorQuery: (() => ({
    type: AuthorType,
    args: {
      id: { type: GraphQLID }
    },
    resolve(parent, args) {
      return authors.find(author => author.id == args.id);
    }
  }))(),

  authorsQuery: (() => ({
    type: new GraphQLList(AuthorType),
    resolve(parent, args) {
      return authors;
    }
  }))()
};
