import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { getPosts, requestPosts } from './store/actions/actionCreators';
import MainPage from './pages/mainPage';

function App({ requestPosts }) {
  useEffect(() => {
    requestPosts();
  });

  return (
    <MainPage />
  );
}

const mapDispatchToProps = {
  requestPosts,
}

export default connect(null, mapDispatchToProps)(App);