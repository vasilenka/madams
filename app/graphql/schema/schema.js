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
const Message = require('./../../models/Message');

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

const TokenType = new GraphQLObjectType({
  name: 'Token',
  fields: () => ({
    token: { type: GraphQLString }
  })
})

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
    },
    messages: {
      type: new GraphQLList(MessageType),
      resolve(parent, args) {
        return Message.find({ projectId: parent.id })
          .then(messages => messages)
          .catch(err => console.log(err))
      }
    }
  })
});

const MessageType = new GraphQLObjectType({
  name: 'Message',
  fields: () => ({
    id: { type: GraphQLID },
    body: { type: GraphQLString },
    project: {
      type: ProjectType,
      resolve(parent, args) {
        return Project.findById(parent.projectId)
          .then(project => project)
          .catch(err => console.log(err));
      }
    },
    sender: {
      type: UserType,
      resolve(parent, args) {
        return User.findById(parent.senderId)
          .then(user => user)
          .catch(err => console.log(err));
      }
    },
    createdAt: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    verify: {
      type: UserType,
      args: {
        token: { type: GraphQLString },
      },
      resolve(parent, args) {
        return User.verify({
          token: args.token
        })
      }
    },
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
        return User.findById(args.id);
      }
    },
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Project.findById(args.id);
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
    login: {
      type: TokenType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parent, args) {
        return User.login({
          email: args.email,
          password: args.password
        });
      }
    },

    addUser: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        password: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
      },
      resolve(parent, args) {
        let user = new User({
          email: args.email,
          username: args.username,
          password: args.password,
          firstName: args.firstName,
          lastName: args.lastName,
          role: []
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
    },

    addMessage: {
      type: MessageType,
      args: {
        body: { type: GraphQLString },
        senderId: { type: GraphQLID },
        projectId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let message = new Message({
          body: args.body,
          senderId: args.senderId,
          projectId: args.projectId
        });
        return message
          .save()
          .then(message => message)
          .catch(err => console.log(err));
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
