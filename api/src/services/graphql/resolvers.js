'use strict';

module.exports = function() {
  let app = this;
  let todoService = app.service('/todos');
  return {
    Query: {
      todos(root, args, context) {
        return todoService.find().then(({data}) => data);
      }
    },

    Mutation: {
      createTodo(root, args, context) {
        return todoService.create(args);
      },
      updateTodo(root, args, context) {
        const data = Object.assign({}, args);
        delete data.id;
        return todoService.patch(args.id, data);
      },
      deleteTodo(root, args, context) {
        return todoService.remove(args.id);
      }
    }
  }
}
