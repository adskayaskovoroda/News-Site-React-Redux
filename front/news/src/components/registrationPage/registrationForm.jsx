import React from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const required = value => value ? undefined : 'Required';
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;
const maxLength = max => value =>
  value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;
const maxLength20 = maxLength(20);
const maxLength50 = maxLength(50);

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
const FullNameField = ({ input, meta: { touched, error } }) => (
  <TextField
    variant="outlined"
    fullWidth
    label="Full Name"
    error={Boolean(touched && error)}
    helperText={touched && error}
    {...input}
  />
);

const RegistrationForm = ({ handleSubmit, submitting }) => {
  return (
    <form className="form" onSubmit={handleSubmit}>
      <Field
        name="email"
        component={EmailField}
        validate={[required, maxLength50, email]}
      />
      <Field
        name="full_name"
        component={FullNameField}
        validate={[maxLength20]}
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
        Sign Up
      </Button>
    </form>
  );
}

export default reduxForm({
  form: 'login-form',
})(RegistrationForm);