import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import {
  required,
  maxLength50,
  maxLength100,
} from '../validators';

import './newPostDialog.css';

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
const capitalizeAll = (str) => str.split(' ').map(el => capitalize(el)).join(' ');

function InputField({ input, meta }) {
  return (
    <TextField
      fullWidth
      required
      label={capitalizeAll(input.name)}
      {...input}
    />
  );
}
function MulInputField({ input, meta }) {
  return (
    <TextField
      fullWidth
      required
      multiline
      label={capitalizeAll(input.name)}
      {...input}
    />
  );
}
function ImageField({ input }) {
  const handleChange = (event) => {
    const { onChange } = input
    onChange(event.target.files[0]);
  }

  return (
    <input
      type="file"
      accept=".jpg, .png, .jpeg"
      onChange={handleChange}
    />
  );
}

function NewPostDialog({ open, close, handleSubmit, submitting }) {
  return (
    <Dialog open={open} onClose={close} fullWidth>
      <DialogTitle>New Post</DialogTitle>
      <form className="new-post-form" onSubmit={handleSubmit}>
        <DialogContent className="news-post-form__fields">
          <Field
            name="title"
            component={InputField}
            validate={[required, maxLength50]}
          />
          <Field
            name="content"
            component={MulInputField}
            validate={[required]}
          />
          <Field
            name="tags"
            component={InputField}
            validate={[required, maxLength100]}
          />
          <Field
            name="image"
            component={ImageField}
            validate={[required]}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={close}>
            Cancel
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={submitting}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default reduxForm({
  form: 'new-post-form',
})(NewPostDialog);