import React, { Component } from 'react';
import { TextField, Paper, RaisedButton } from 'material-ui';
import style from './LoginForm.css';

export default class LoginForm extends Component {
  static propTypes = {
    header: React.PropTypes.string,
    handleKeyDown: React.PropTypes.func,
    email: React.PropTypes.string,
    emailHandleChange: React.PropTypes.func.isRequired,
    emailHandleBlur: React.PropTypes.func.isRequired,
    emailTouched: React.PropTypes.bool.isRequired,
    emailError: React.PropTypes.bool,
    password: React.PropTypes.string,
    passwordHandleChange: React.PropTypes.func.isRequired,
    passwordHandleBlur: React.PropTypes.func.isRequired,
    passwordTouched: React.PropTypes.bool.isRequired,
    passwordError: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
  };

  render() {
    const {
      header,
      handleKeyDown,
      email,
      emailHandleChange,
      emailHandleBlur,
      emailTouched,
      emailError,
      password,
      passwordHandleChange,
      passwordHandleBlur,
      passwordTouched,
      passwordError,
      handleSubmit,
    } = this.props;

    return (
          <Paper
            className={style.container}
            onKeyDown={handleKeyDown}
          >
            {header}
            <div>
              <TextField
                floatingLabelText="Email"
                value={email}
                onChange={emailHandleChange}
                onBlur={emailHandleBlur}
                errorText={emailTouched ? emailError : ''}
              />
            </div>
            <div>
              <TextField
                type="password"
                floatingLabelText="Password"
                value={password}
                onChange={passwordHandleChange}
                onBlur={passwordHandleBlur}
                errorText={passwordTouched ? passwordError : ''}
              />
            </div>
            <div className={style.submitButton}>
              <RaisedButton
                label="Login"
                secondary
                fullWidth
                onClick={handleSubmit}
              />
            </div>
          </Paper>
      );
  }
}
