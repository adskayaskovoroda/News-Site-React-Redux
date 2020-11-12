import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { loginUser } from '../../store/actions/actions';
import LoginForm from './loginForm';

import './loginPage.css';

function LoginPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const isSucceed = useSelector(state => (state.access && state.access.isGranted) || false)

  const handleSubmit = (values) => {
    dispatch(loginUser(values));
  }

  const googleSuccess = ({ profileObj }) => {
    console.log(profileObj)
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

  useEffect(() => {
    if (isSucceed) {
      history.push('/');
    }
  }, [isSucceed])

  return (
    <div className="login-page">
      <Avatar className="sign">
        <LockOutlinedIcon />
      </Avatar>
      <Typography className="label" component="h1" variant="h4">
        Sign in
      </Typography>
      <LoginForm onSubmit={handleSubmit} />
      <Link className="register" href="/registration" variant="body2">
        Don't have an account? Sign Up
      </Link>
      <div className="sep" />
      <div id="signinGoogle" className="google" />
    </div>
  );
}

export default LoginPage;