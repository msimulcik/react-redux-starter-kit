import React from 'react';
import { Header } from 'components/Header/Header';
import { IndexLink, Link } from 'react-router';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

describe('(Component) Header', () => {
  let _wrapper;
  let _spies;

  beforeEach(() => {
    _spies = {};
    _wrapper = shallow(<Header localeChange={(_spies.localeChange = sinon.spy())} />);
  });

  it('Renders a welcome message', () => {
    const welcome = _wrapper.find('h1').find(FormattedMessage);
    expect(welcome).to.have.prop('id', 'header.appTitle');
  });

  describe('Navigation links...', () => {
    it('Should render an IndexLink to Home route', () => {
      const link = _wrapper.find(IndexLink);
      expect(link).to.exist();
      expect(link).to.have.prop('to', '/');
    });

    it('Should render an Link to Counter route', () => {
      const link = _wrapper.find(Link);
      expect(link).to.have.prop('to', '/counter');
    });
  });
});
