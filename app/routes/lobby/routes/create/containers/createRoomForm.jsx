import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { TextField, RaisedButton, Checkbox } from 'material-ui';

export const fields = ['roomName', 'isPublic'];

const validate = values => {
  const errors = {};
  if (!values.roomName) {
    errors.roomName = 'Required';
  }
  return errors;
};

const asyncValidate = (values/*, dispatch */) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (['john', 'paul', 'george', 'ringo'].includes(values.roomName)) {
        reject({ roomName: 'That username is taken' });
      } else {
        resolve();
      }
    }, 1000); // simulate server latency
  });
};

const submit = (values, dispatch) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!['john', 'paul', 'george', 'ringo'].includes(values.roomName)) {
        reject({ roomName: 'User does not exist', _error: 'Login failed!' });
      } else if (values.password !== 'redux-form') {
        reject({ password: 'Wrong password', _error: 'Login failed!' });
      } else {
        resolve();
      }
    }, 1000); // simulate server latency
  });
};

class CreateRoomForm extends Component {
  static propTypes = {
    fields: React.PropTypes.object.isRequired,
    handleSubmit: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
    resetForm: React.PropTypes.func.isRequired,
    submitting: React.PropTypes.bool.isRequired,
  };

  render() {
    const {
      fields: { roomName, isPublic },
      error,
      resetForm,
      handleSubmit,
      submitting,
    } = this.props;

    return (<form onSubmit={handleSubmit(submit)}>
      <div>
        <label>Room name: </label>
        <TextField {...roomName}/>
        { roomName.touched && roomName.error && <div>{roomName.error}</div> }
        <label>Public: </label>
        <Checkbox {...isPublic} />
        { error && <div>{error}</div> }
        <RaisedButton
          label="Create"
          disabled={submitting}
          onClick={handleSubmit(submit)}
        />
        <RaisedButton
          label="Clear Values"
          disabled={submitting}
          onClick={resetForm}
        />
      </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'CreateRoom',
  fields,
  asyncValidate,
  asyncBlurFields: ['roomName'],
  validate,
})(CreateRoomForm);
