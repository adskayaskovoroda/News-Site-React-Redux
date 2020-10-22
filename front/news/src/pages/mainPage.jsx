import React from 'react';
import { connect } from 'react-redux';
import TopPanel from '../components/topPanel';
import NewsList from '../components/newsList';
import NewsCard from '../components/newsCard';

function MainPage({ posts }) {

  return (
    <>
      <TopPanel />
      <NewsList>
        {posts.map(el => <NewsCard data={el} key={el.id} />)}
      </NewsList>
    </>
  );
}

const mapStateToProps = state => ({posts: state.posts});

export default connect(mapStateToProps, null)(MainPage);