import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';
import classes from './CoreLayout.scss';
import { localeChange as localeChangeAction } from 'modules/locale';
import '../../styles/core.scss';
import 'styles/global/global.scss';

export const CoreLayout = ({ children, localeChange }) => (
  <div className="container text-center">
    <Header localeChange={localeChange} />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired,
  localeChange: PropTypes.func.isRequired,
};

export default connect(null, {
  localeChange: localeChangeAction,
})(CoreLayout);
