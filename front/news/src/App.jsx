import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { SnackbarProvider } from 'notistack';
import Access from './components/access';
import MainPage from './components/mainPage/mainPage';
import UserPage from './components/userPage/userPage';
import LoginPage from './components/loginPage/loginPage';
import RegistrationPage from './components/registrationPage/registrationPage';
import './app.css';


function App() {
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
          <Route path="/user/:userID">
            <Access>
              <UserPage />
            </Access>
          </Route>
          <Route path='/login'>
            <LoginPage />
          </Route>
          <Route path='/registration'>
            <RegistrationPage />
          </Route>
          <Route path="/">
            <Access>
              <MainPage />
            </Access>
          </Route>
        </Switch>
      </Router>
    </SnackbarProvider>
  );
}

export default App;