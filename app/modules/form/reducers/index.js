import { reducer } from 'redux-form';
import { loginForm } from './login';

export const formReducer = reducer.plugin({
  loginForm,
});
