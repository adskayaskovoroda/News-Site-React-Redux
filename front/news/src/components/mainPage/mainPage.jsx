import React from 'react';
import { useSelector } from 'react-redux';
import TopPanel from '../topPanel/topPanel';
import NewsList from '../news/newsList';
import NewsCard from '../news/newsCard';

function MainPage() {
  const posts = useSelector(state => state.posts)

  return (
    <>
      <TopPanel />
      <NewsList>
        {posts.map(el => <NewsCard data={el} key={el.id} />)}
      </NewsList>
    </>
  );
}

export default MainPage;