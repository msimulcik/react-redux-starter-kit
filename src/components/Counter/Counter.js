import React from 'react';
import classes from './Counter.scss';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  label: {
    id: 'counter.label',
    description: 'Counter label',
    defaultMessage: 'Counter',
  },
  increment: {
    id: 'counter.increment',
    description: 'Increment button text',
    defaultMessage: 'Increment',
  },
  double: {
    id: 'counter.double',
    description: 'Double button text',
    defaultMessage: 'Double (Async)',
  },
});

export const Counter = (props) => (
  <div>
    <h2 className={classes.counterContainer}>
      <FormattedMessage {...messages.label} />
      {' '}
      <span className={classes['counter--green']}>
        {props.counter}
      </span>
    </h2>
    <button className="btn btn-default" onClick={props.increment}>
      <FormattedMessage {...messages.increment} />
    </button>
    {' '}
    <button className="btn btn-default" onClick={props.doubleAsync}>
      <FormattedMessage {...messages.double} />
    </button>
  </div>
);

Counter.propTypes = {
  counter: React.PropTypes.number.isRequired,
  doubleAsync: React.PropTypes.func.isRequired,
  increment: React.PropTypes.func.isRequired,
};

export default Counter;
