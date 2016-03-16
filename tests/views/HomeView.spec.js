import React from 'react';
import { bindActionCreators } from 'redux';
import { HomeView } from 'views/HomeView/HomeView';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';

describe('(View) Home', () => {
  let _component;
  let _props;
  let _spies;

  beforeEach(() => {
    _spies = {};
    _props = {
      counter: 0,
      ...bindActionCreators({
        doubleAsync: (_spies.doubleAsync = sinon.spy()),
        increment: (_spies.increment = sinon.spy()),
        localeChange: (_spies.localeChange = sinon.spy()),
      }, _spies.dispatch = sinon.spy()),
    };

    _component = shallow(<HomeView {..._props} />);
  });

  it('Should render as a <div>.', () => {
    expect(_component.type()).to.equal('div');
  });

  it('Should include an <h1> with welcome message.', () => {
    expect(_component.find('h1').find(FormattedMessage)).to.have.prop('id', 'home.welcome');
  });

  it('Should render with an <h2> that includes Sample Counter message.', () => {
    expect(_component.find('h2').find(FormattedMessage)).to.have.prop('id', 'home.sampleCounter');
  });

  it('Should render props.counter at the end of the sample counter <h2>.', () => {
    const h2 = shallow(<HomeView {...{ ..._props, counter: 5 }} />).find('h2');

    expect(h2).to.exist();
    expect(h2).to.have.text().match(/5$/);
  });

  it('Should render exactly two buttons.', () => {
    expect(_component).to.have.descendants('.btn');
  });

  describe('An increment button...', () => {
    let _btn;

    beforeEach(() => {
      _btn = _component.findWhere(n => n.type() === 'button' && /Increment/.test(n.text()));
    });

    it('should be rendered.', () => {
      expect(_btn).to.exist();
    });

    it('should dispatch an action when clicked.', () => {
      _spies.increment.should.have.not.been.called();
      _btn.simulate('click');
      _spies.increment.should.have.been.called();
    });
  });

  describe('A Double (Async) button...', () => {
    let _btn;

    beforeEach(() => {
      _btn = _component.findWhere(n => n.type() === 'button' && /Double/.test(n.text()));
    });

    it('should be rendered.', () => {
      expect(_btn).to.exist();
    });

    it('should dispatch an action when clicked.', () => {
      _spies.doubleAsync.should.have.not.been.called();
      _btn.simulate('click');
      _spies.doubleAsync.should.have.been.called();
    });
  });
});
