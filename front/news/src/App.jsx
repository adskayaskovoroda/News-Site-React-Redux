import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { requestPosts } from './store/actions/actionCreators';
import MainPage from './components/mainPage/mainPage';
import './app.css';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(requestPosts())
  });

  return (
    <MainPage />
  );
}

export default App;