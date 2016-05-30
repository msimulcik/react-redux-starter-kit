import React from 'react';
import DuckImage from '../assets/Duck.jpg';
import classes from './HomeView.scss';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  welcome: {
    id: 'home.welcome',
    description: 'Welcome to the homepage',
    defaultMessage: 'Welcome to the React Redux Starter Kit',
  },
  duckImgAlt: {
    id: 'home.duckImgAlt',
    description: 'Alternative text for Duck image',
    defaultMessage: 'This is a duck, because Redux!',
  },
});

export const HomeView = ({ intl: { formatMessage } }) =>
(
  <div>
    <h4><FormattedMessage {...messages.welcome} /></h4>
    <img
      alt={formatMessage(messages.duckImgAlt)}
      className={classes.duck}
      src={DuckImage}
    />
  </div>
);

HomeView.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(HomeView);
