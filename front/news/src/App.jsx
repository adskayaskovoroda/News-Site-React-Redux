import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useDispatch } from 'react-redux'
import { requestPosts } from './store/actions/actionCreators';
import MainPage from './components/mainPage/mainPage';
import './app.css';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestPosts())
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/">
          <MainPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;