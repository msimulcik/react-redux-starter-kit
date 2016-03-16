import React, { Component, PropTypes } from 'react';
import { defineMessages, injectIntl, intlShape } from 'react-intl';

const messages = defineMessages({
  spanish: {
    id: 'languageSelector.spanish',
    description: 'Select language',
    defaultMessage: 'Spanish',
  },
  english: {
    id: 'languageSelector.english',
    description: 'Select language',
    defaultMessage: 'English',
  },
  french: {
    id: 'languageSelector.french',
    description: 'Select language',
    defaultMessage: 'French',
  },
});

export class LanguageSelector extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    const { formatMessage, locale } = this.props.intl;
    return (
      <select value={locale} onChange={this.handleChange}>
        <option id="es" value="es">{formatMessage(messages.spanish)}</option>
        <option id="fr" value="fr">{formatMessage(messages.french)}</option>
        <option id="en" value="en">{formatMessage(messages.english)}</option>
      </select>
    );
  }
}

export default injectIntl(LanguageSelector);
