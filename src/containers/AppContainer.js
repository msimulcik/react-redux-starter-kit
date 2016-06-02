import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { connect } from 'react-redux';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { IntlProvider } from 'react-intl';
import * as messages from 'i18n/';

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    apolloClient: PropTypes.instanceOf(ApolloClient),
  }

  render() {
    const { history, routes, routerKey, store, apolloClient } = this.props;

    const intlData = {
      locale: this.props.locale,
      messages: messages[this.props.locale],
    };

    return (
      <ApolloProvider store={store} client={apolloClient}>
        <div style={{ height: '100%' }}>
          <IntlProvider {...intlData}>
            <Router history={history} children={routes} key={routerKey} />
          </IntlProvider>
        </div>
      </ApolloProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
});
export default connect((mapStateToProps))(AppContainer);
