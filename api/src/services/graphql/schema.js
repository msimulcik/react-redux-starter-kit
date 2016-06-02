'use strict';

module.exports = `
# Todo item
type Todo {
  # id of todo
  id: Int!
  # todo text
  text: String
  # flag if todo is complete
  complete: Boolean
}

type Query {
  # list of todos
  todos(complete: Boolean): [Todo]
}

type Mutation {
  # creates todo
  createTodo(
    text: String!
  ): Todo

  # patches todo with given ID
  updateTodo(
    id: Int!
    text: String
    complete: Boolean
  ): Todo

  # deletes todo
  deleteTodo(
    id: Int!
  ): Todo
}
`;
