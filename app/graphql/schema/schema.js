const graphql = require('graphql');
const _ = require('lodash');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

let books = [
  {
    id: '1',
    name: 'Sherlock Holmes',
    genre: 'thriller',
    authorId: '1'
  },
  {
    id: '2',
    name: 'The Programming Language',
    genre: 'computer science',
    authorId: '2'
  },
  {
    id: '3',
    name: 'Romeo and Juliet',
    genre: 'romance',
    authorId: '3'
  },
  {
    id: '4',
    name: 'Javascript and Stuff and Things',
    genre: 'myth',
    authorId: '3'
  },
  {
    id: '5',
    name: "Let's talk about today",
    genre: 'slice of life',
    authorId: '2'
  },
  {
    id: '6',
    name: 'Simba and Masbul',
    genre: 'adventure',
    authorId: '2'
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
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return authors.find(author => author.id == parent.authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books.filter(book => book.authorId == parent.id);
      }
    }
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
        return books.find(book => book.id == args.id);
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return authors.find(author => author.id == args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({ query: RootQuery });
