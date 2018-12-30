const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql;

let books = [
  {
    id: '1',
    name: 'Sherlock Holmes',
    genre: 'thriller'
  },
  {
    id: '2',
    name: 'The Programming Language',
    genre: 'computer science'
  },
  {
    id: '3',
    name: 'Romeo and Juliet',
    genre: 'romance'
  }
];

let authors = [
  {
    id: '1',
    name: 'Ongki Herlambang',
    age: 25
  },
  {
    id: '2',
    name: 'Khairani Ummah',
    age: 25
  },
  {
    id: '3',
    name: 'Hanifan Mohammad',
    age: 24
  }
];

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        console.log(args.id);
        return _.find(authors, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
