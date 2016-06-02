'use strict';
const company = require('./company');
const todos = require('./todos');
const authentication = require('./authentication');
const user = require('./user');
const graphql = require('./graphql');
const Sequelize = require('sequelize');
module.exports = function() {
  const app = this;

  const sequelize = new Sequelize(app.get('postgres'), {
    dialect: 'postgres',
    logging: false
  });
  app.set('sequelize', sequelize);

  app.configure(authentication);
  app.configure(user);
  app.configure(todos);
  app.configure(graphql);
  app.configure(company);
};
