import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CoreLayout from 'layouts/CoreLayout/CoreLayout';

function shallowRender(component) {
  const renderer = TestUtils.createRenderer();

  renderer.render(component);
  return renderer.getRenderOutput();
}

function shallowRenderWithProps(props = {}) {
  return shallowRender(<CoreLayout {...props} />);
}

describe('(Layout) Core', () => {
  let _component;
  const _child = <h1 className="child">Child</h1>;
  const _props = {
    children: _child,
  };

  beforeEach(() => {
    _component = shallowRenderWithProps(_props);
  });

  it('Should render as a <div>.', () => {
    expect(_component.type).to.equal('div');
  });
});
