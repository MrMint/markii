import React from 'react';
import { mount } from 'enzyme';
import chai, { expect } from 'chai';
import dirtyChai from 'dirty-chai';
chai.use(dirtyChai);

import App from './app';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

describe('<App />', () => {

  it('renders the redux provider', () => {
    const wrapper = mount(<App />);

    expect(wrapper.find(Provider)).to.have.length(1);
  });

  it('renders the router', () => {
    const wrapper = mount(<App routes={null}/>);

    expect(wrapper.find(Router)).to.have.length(1);
  });
});
