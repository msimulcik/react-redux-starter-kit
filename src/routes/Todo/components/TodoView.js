import React, { PropTypes } from 'react';
import { connect } from 'react-apollo';
import classes from './TodoView.scss';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  heading: {
    id: 'todos.heading',
    description: 'Todo page heading',
    defaultMessage: 'Todo List',
  },
  addButton: {
    id: 'todos.addButton',
    description: 'Add todo button text',
    defaultMessage: 'Add todo',
  },
});

export const TodoView = ({ data, mutations }) => {
  let input;

  if (data.loading && !data.todos) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.TodoView}>
      <h1><FormattedMessage {...messages.heading} /></h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!input.value.trim()) {
            return;
          }
          mutations.createTodo(input.value).then(({ data: mutData }) => {
            if (mutData) {
              data.refetch();
            }
          });
          input.value = '';
        }}
      >
        <input
          ref={node => {
            input = node;
          }}
        />
        <button type="submit">
          <FormattedMessage {...messages.addButton} />
        </button>
      </form>
      <ul>
        {
          data.todos.map((todo) => <li key={todo.id}>{todo.text}</li>)
        }
      </ul>
    </div>
  );
};

TodoView.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.arrayOf(Error),
    refetch: PropTypes.func.isRequired,
    todos: PropTypes.array,
  }),
  mutations: PropTypes.shape({
    createTodo: PropTypes.func.isRequired,
  }),
};

function mapQueriesToProps() {
  return {
    data: {
      query: gql`
        query {
          todos {
            id
            text
            complete
          }
        }
      `
    },
  };
}

function mapMutationsToProps() {
  return {
    createTodo: (text) => ({
      mutation: gql`
        mutation createTodo(
          $text: String!
        ) {
          createTodo(
            text: $text
          ) {
            id
            text
            complete
          }
        }
      `,
      variables: {
        text,
      },
    }),
  };
}

export default connect({
  mapQueriesToProps,
  mapMutationsToProps,
})(TodoView);
