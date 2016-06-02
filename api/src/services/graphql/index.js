'use strict';

const hooks = require('./hooks');
const apolloServer = require('graphql-tools').apolloServer;
const Resolvers = require('./resolvers');
const Schema = require('./schema');
const createSchema = require('graph.ql');

module.exports = function() {
  const app = this;

  // Initialize our service with any options it requires
  app.use('/graphql', apolloServer({
    graphiql: true,
    pretty: true,
    schema: createSchema(
      Schema,
      Resolvers.call(app)
    ).schema
    // mocks: {},
    // resolvers: Resolvers.call(app)
  }));

};
