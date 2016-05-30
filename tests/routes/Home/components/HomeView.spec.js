import React from 'react';
import { HomeView } from 'routes/Home/components/HomeView';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

describe('(View) Home', () => {
  let _component;
  let _props;
  let _spies;

  beforeEach(() => {
    _spies = {};
    _props = {
      intl: {
        formatMessage: (_spies.formatMessage = sinon.stub().returns('foo')),
        formatDate: sinon.spy(),
        formatTime: sinon.spy(),
        formatRelative: sinon.spy(),
        formatNumber: sinon.spy(),
        formatPlural: sinon.spy(),
        formatHTMLMessage: sinon.spy(),
        now: sinon.spy(),
      },
    };
    _component = shallow(<HomeView {..._props} />);
  });

  it('Renders a welcome message', () => {
    const welcome = _component.find('h4').find(FormattedMessage);
    expect(welcome).to.have.prop('id', 'home.welcome');
  });

  it('Renders an awesome duck image', () => {
    const duck = _component.find('img');
    expect(duck).to.have.prop('alt');
    _spies.formatMessage.should.have.been.calledWithMatch({
      id: 'home.duckImgAlt',
    });
  });
});
