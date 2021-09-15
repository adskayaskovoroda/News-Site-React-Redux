import React from 'react';
import {
    Router,
    Switch,
    Route,
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage'
import history from './utils/history';

function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/signin'>
                    <SignInPage />
                </Route>
                <Route path='/signup'>
                    <SignUpPage />
                </Route>
                <PrivateRoute path='/user/:userId'>
                    <UserPage />
                </PrivateRoute>
                <PrivateRoute path='/'>
                    <MainPage />
                </PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;
