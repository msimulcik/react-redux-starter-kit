import React, { PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';
import LanguageSelector from 'components/LanguageSelector';
import { defineMessages, FormattedMessage } from 'react-intl';

const messages = defineMessages({
  appTitle: {
    id: 'header.appTitle',
    description: 'App title',
    defaultMessage: 'React Redux Starter Kit',
  },
  homeLink: {
    id: 'header.homeLink',
    description: 'Link to home page',
    defaultMessage: 'Home',
  },
  counterLink: {
    id: 'header.counterLink',
    description: 'Link to counter page',
    defaultMessage: 'Counter',
  },
  todoLink: {
    id: 'header.todoLink',
    description: 'Link to todo page',
    defaultMessage: 'Todo',
  },
});

export const Header = ({ localeChange }) => (
  <div>
    <h1><FormattedMessage {...messages.appTitle} /></h1>
    <IndexLink to="/" activeClassName={classes.activeRoute}>
      <FormattedMessage {...messages.homeLink} />
    </IndexLink>
    {' · '}
    <Link to="/counter" activeClassName={classes.activeRoute}>
      <FormattedMessage {...messages.counterLink} />
    </Link>
    {' · '}
    <Link to="/todo" activeClassName={classes.activeRoute}>
      <FormattedMessage {...messages.todoLink} />
    </Link>
    <LanguageSelector onChange={localeChange} />
  </div>
);

Header.propTypes = {
  localeChange: PropTypes.func.isRequired,
};

export default Header;
