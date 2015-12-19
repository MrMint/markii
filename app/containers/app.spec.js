import React from 'react';
import { shallow } from 'enzyme';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import App from './app';
import DevTools from './DevTools';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

describe('<App />', () => {
  it('renders the dev tools', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.contains(<DevTools />)).to.be.true();
  });

  it('renders the redux provider', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Provider)).to.have.length(1);
  });

  it('renders the router', () => {
    const wrapper = shallow(<App routes={null}/>);

    expect(wrapper.find(Router)).to.have.length(1);
  });
});
