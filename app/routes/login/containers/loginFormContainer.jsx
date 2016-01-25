import React, { Component } from 'react';
import LoginForm from '../components/loginForm';
import { reduxForm } from 'redux-form';


export const fields = ['email', 'password'];

class LoginFormContainer extends Component {
  static propTypes = {
    header: React.PropTypes.string,
    fields: React.PropTypes.object.isRequired,
    error: React.PropTypes.string,
    resetForm: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      handleSubmit(p.values);
    }
  };

  render() {
    const { header, fields: { email, password }, handleSubmit, error } = this.props;
    return (
        <LoginForm
          header={header}
          error={error}
          handleKeyDown={this.handleKeyDown}
          email={email.value}
          emailHandleChange={email.onChange}
          emailHandleBlur={email.onBlur}
          emailTouched={email.touched}
          emailError={email.error}
          password={password.value}
          passwordHandleChange={password.onChange}
          passwordHandleBlur={password.onBlur}
          passwordTouched={password.touched}
          passwordError={password.error}
          handleSubmit={handleSubmit}
        />
    );
  }
}

export default reduxForm({
  form: 'loginForm',
  fields,
  asyncBlurFields: ['email'],
})(LoginFormContainer);
