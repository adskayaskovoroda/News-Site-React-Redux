import React, { useState, useMemo } from 'react';
import { Field, reduxForm } from 'redux-form';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import './userCard.css';

const Label = ({ children }) => (
  <Typography
    align="left"
    variant="subtitle1"
    color="primary"
  >
    {children}
  </Typography>
);
const Content = ({ children }) => (
  <Typography
    variant="subtitle1"
  >
    {children}
  </Typography>
);

const InputField = ({ input }) => (
  <TextField
    variant="outlined"
    size="small"
    {...input}
  />
);
const ImageField = ({ input }) => {
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
const PasswordField = ({ input }) => (
  <TextField
    variant="outlined"
    size="small"
    type="password"
    {...input}
  />
);

function UserCard({ user, handleSubmit }) {
  const [editMode, setEditMode] = useState(false);
  const toggleMode = () => setEditMode(prev => !prev);
  const myID = useSelector(state => state.me.id);
  const isMe = useMemo(() => myID === user.id, [myID, user.id]);

  const ReadActions = () => (
    isMe && (
      <Button
        color="primary"
        variant="contained"
        onClick={toggleMode}
      >
        Edit
      </Button>
    )
  );
  const EditActions = () => (
    <div style={{ display: 'flex', columnGap: '5px', }}>
      <Button
        color="secondary"
        variant="contained"
        onClick={toggleMode}
      >
        Cancel
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          handleSubmit();
          toggleMode();
        }}
      >
        Save
      </Button>
    </div>
  );

  return (
    <Card variant="outlined" className="user-card">
      <CardMedia
        component="img"
        image={user.avatar}
        className="user-card__avatar"
      />
      <CardContent>
        <div className="user-data">
          <Label>Username:</Label>
          {
            editMode && isMe
              ? <Field name="username" component={InputField} />
              : <Content>{user.full_name}</Content>
          }
          <Label>Email:</Label>
          {
            editMode && isMe
              ? <Field name="email" component={InputField} />
              : <Content>{user.email}</Content>
          }
          {editMode && isMe && (
            <>
              <Label>Avatar:</Label>
              <Field name="avatar" component={ImageField} />
            </>
          )}
          {editMode && isMe && (
            <>
              <Label>New Password:</Label>
              <Field name="password" component={PasswordField} />
            </>
          )}
        </div>
      </CardContent>
      <CardContent className="user-card__actions">
        {editMode ? <EditActions /> : <ReadActions />}
      </CardContent>
    </Card>
  );
}

export default reduxForm({
  form: 'user-form',
})(UserCard);