import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { CircularProgress } from '@material-ui/core';
import TopPanel from '../topPanel/topPanel';
import NewsList from '../news/newsList';
import NewsCard from '../news/newsCard';

import './mainPage.css';
import { usePagination } from '../usePagination';

const PAGE_CAP = 1;

function MainPage() {
  const posts = useSelector(state => state.posts);
  const loaderStatus = useSelector(state => state.showLoader);
  const [pageItems, setPage, binder] = usePagination(posts, PAGE_CAP);
  useEffect(() => setPage(1), [posts]);

  return (
    <>
      <TopPanel onSearch={() => setPage(1)}/>
      <Pagination
        className="pagination"
        variant="outlined"
        color="primary"
        size="large"
        {...binder}
      />
      <NewsList>
        {
          loaderStatus
            ? <CircularProgress />
            : pageItems.length
              ? pageItems.map(el => <NewsCard data={el} key={el.id} />)
              : <div className="no-posts">There Are No Posts Here!</div>
        }
      </NewsList>
      <Pagination
        className="pagination"
        variant="outlined"
        color="primary"
        size="large"
        {...binder}
      />
    </>
  );
}

export default MainPage;