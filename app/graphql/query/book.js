const queryBook = {
  type: BookType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, args) {
    return books.find(book => book.id == args.id);
  }
};

const queryBooks = {
  type: new GraphQLList(BookType),
  resolve(parent, args) {
    return books;
  }
};
