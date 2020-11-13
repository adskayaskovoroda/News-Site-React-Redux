import React from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  required,
  email,
  maxLength20,
  maxLength50,
} from '../validators';

const EmailField = ({ input, meta: { touched, error } }) => (
  <TextField
    variant="outlined"
    required
    fullWidth
    label="Email Address"
    autoFocus
    error={Boolean(touched && error)}
    helperText={touched && error}
    {...input}
  />
);
const PasswordField = ({ input, meta: { touched, error } }) => (
  <TextField
    variant="outlined"
    required
    fullWidth
    label="Password"
    type="password"
    error={Boolean(touched && error)}
    helperText={touched && error}
    {...input}
  />
);

const LoginForm = ({ handleSubmit, submitting }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <Field
        name="email"
        component={EmailField}
        validate={[required, maxLength50, email]}
      />
      <Field
        name="password"
        component={PasswordField}
        validate={[required, maxLength20]}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        disabled={submitting}
      >
        Sign In
      </Button>
    </form>
  );
}

export default reduxForm({
  form: 'login-form',
})(LoginForm);