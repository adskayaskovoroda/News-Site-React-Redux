import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { registerUser, loginUser } from '../../store/actions/actions';
import RegistrationForm from './registrationForm';
import { useSnackbar } from 'notistack';
import { ERROR } from '../../store/actions/types';

import './registrationPage.css';

function RegistrationPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const error = useSelector(state => state.error);
  const isSucceed = useSelector(state => (state.access && state.access.isGranted) || false)

  const handleSubmit = (values) => {
    dispatch(registerUser(values));
  }

  useEffect(() => {
    if (error.isErrorOccurred) {
      enqueueSnackbar(error.text, {
        variant: 'error',
      });
      dispatch({
        type: ERROR,
        payload: {},
      });
    }
  }, [error]);

  useEffect(() => {
    if (isSucceed) {
      history.push('/');
    }
  }, [isSucceed])

  const googleSuccess = ({ profileObj }) => {
    const profile = {
      email: profileObj.email,
      password: profileObj.googleId,
      full_name: profileObj.name,
      avatar: profileObj.imageUrl,
      isGoogle: true,
    };
    dispatch(loginUser(profile));
  }

  const renderGoogle = () => {
    ReactDOM.render(
      <GoogleLogin
        clientId="399978654308-3e8ua5aad8pbsmrgm6ufav37omiubn3f.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={googleSuccess}
        onFailure={() => {}}
      />,
      document.getElementById('signinGoogle')
    );
  }

  useEffect(() => {
    renderGoogle();
  }, []);

  return (
    <div className="registration-page">
      <Avatar className="sign">
        <LockOutlinedIcon />
      </Avatar>
      <Typography className="label" component="h1" variant="h4">
        Sign Up
      </Typography>
      <RegistrationForm onSubmit={handleSubmit} />
      <Link className="login" href="/login" variant="body2">
        Already have an account? Sign In
      </Link>
      <div className="sep" />
      <div id="signinGoogle" className="google" />
    </div>
  );
}

export default RegistrationPage;