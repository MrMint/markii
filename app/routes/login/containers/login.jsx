import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoginForm from './loginFormContainer';
import { login } from '../../../modules/user/actions/index';

class Login extends Component {
  static propTypes = {
    location: React.PropTypes.object,
  };

  handleLoginSubmit = (data, dispatch) => {
    const { redirect } = this.props.location.query;
    dispatch(login(data.email, data.password, redirect));
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

export default connect()(Login);
