'use strict';

const service = require('feathers-memory');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  let options = {
    paginate: {
      default: 25,
      max: 100
    }
  };

  // Initialize our service with any options it requires
  app.use('/todos', service(options));

  // Get our initialize service to that we can bind hooks
  const todosService = app.service('/todos');

  // Set up our before hooks
  todosService.before(hooks.before);

  // Set up our after hooks
  todosService.after(hooks.after);
};
