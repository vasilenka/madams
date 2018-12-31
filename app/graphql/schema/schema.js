const graphql = require('graphql');
const _ = require('lodash');
const mongoose = require('mongoose');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLInputObjectType
} = graphql;

const User = require('./../../models/User');
const Project = require('./../../models/Project');

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        parent.projects
          ? parent.projects.length > 0
            ? parent.projects.map(project => {
                let query = { _id: project.id };
                Project.find(query)
                  .then(project => project)
                  .catch(err => console.log(err));
              })
            : ''
          : '';
      }
    }
  })
});

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    teams: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return parent.teams.map(id =>
          User.findById(id)
            .then(user => user)
            .catch(err => console.log(err))
        );
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find()
          .then(users => users)
          .catch(err => console.log(err));
      }
    },
    user: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return books.find(book => book.id == args.id);
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // return authors.find(author => author.id == args.id);
      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find()
          .then(projects => projects)
          .catch(err => console.log(err));
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        projects: { type: GraphQLList(GraphQLString) }
      },
      resolve(parent, args) {
        let user = new User({
          username: args.username,
          email: args.email,
          projects: args.projects
        });

        return user
          .save()
          .then(user => user)
          .catch(err => console.log('Error: ', err));
      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: GraphQLString },
        teams: { type: new GraphQLList(GraphQLString) }
      },
      resolve(parent, args) {
        let project = new Project({
          name: args.name,
          teams: args.teams
        });
        return project
          .save()
          .then(project => project)
          .catch(err => console.log(err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
