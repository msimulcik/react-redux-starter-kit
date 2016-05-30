import React from 'react';
import { CoreLayout } from 'layouts/CoreLayout/CoreLayout';
import { shallow } from 'enzyme';

describe('(Layout) Core', () => {
  let _spies;
  let _component;
  const _child = <h1 className="child">Child</h1>;
  let _props;

  beforeEach(() => {
    _spies = {};
    _props = {
      children: _child,
      localeChange: (_spies.localeChange = sinon.spy()),
    };
    _component = shallow(<CoreLayout {..._props} />);
  });

  it('Should render as a <div>.', () => {
    expect(_component.type()).to.equal('div');
  });
});
