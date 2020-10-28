import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import TopPanel from '../topPanel/topPanel';
import NewsList from '../news/newsList';
import NewsCard from '../news/newsCard';

import './mainPage.css';

const ITEMS_PER_PAGE = 1;

function MainPage() {
  const posts = useSelector(state => state.posts);
  const [curPage, setPage] = useState(1);
  const changePage = (e, newPage) => {
    setPage(newPage)
  };

  const start = () => (curPage - 1) * ITEMS_PER_PAGE;     // start for slice
  const end = () => start() + ITEMS_PER_PAGE;             // end for slice
  const pagesAmount = () => posts.length / ITEMS_PER_PAGE

  return (
    <>
      <TopPanel />
      <Pagination
        className="pagination"
        count={pagesAmount()}
        variant="outlined"
        color="primary"
        size="large"
        page={curPage}
        onChange={changePage}
      />
      <NewsList>
        {
          posts.length
            ? posts.slice(start(),end()).map(el => <NewsCard data={el} key={el.id} />)
            : <div className="no-posts">There Are No Posts Here!</div>
        }
      </NewsList>
      <Pagination
        className="pagination"
        count={pagesAmount()}
        variant="outlined"
        color="primary"
        size="large"
        page={curPage}
        onChange={changePage}
      />
    </>
  );
}

export default MainPage;