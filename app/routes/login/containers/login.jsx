import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './loginFormContainer';
import { login } from '../../../modules/user/actions/index';

class Login extends Component {

  handleLoginSubmit = (data, dispatch) => {
    dispatch(login(data.email, data.password));
  };

  render() {
    return (
        <LoginForm
          onSubmit={this.handleLoginSubmit}
          header={"Login"}
        />
    );
  }
}

export default connect((state) => ({
}))(Login);
