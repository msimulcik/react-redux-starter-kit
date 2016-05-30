import React from 'react';
import HomeRoute from 'routes/Home';
import { shallow } from 'enzyme';

describe('(Route) Home', () => {
  let _component;
  let _context;

  beforeEach(() => {
    _context = {
      intl: {
        formatMessage: sinon.spy(),
        formatDate: sinon.spy(),
        formatTime: sinon.spy(),
        formatRelative: sinon.spy(),
        formatNumber: sinon.spy(),
        formatPlural: sinon.spy(),
        formatHTMLMessage: sinon.spy(),
        now: sinon.spy(),
      },
    };
    _component = shallow(<HomeRoute.component />, { context: _context });
  });

  it('Should return a route configuration object', () => {
    expect(typeof(HomeRoute)).to.equal('object');
  });

  it('Should define a route component', () => {
    expect(_component.find('HomeView')).to.exist();
  });
});
