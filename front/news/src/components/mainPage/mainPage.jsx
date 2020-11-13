import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TopPanel from '../topPanel/topPanel';
import NewsList from '../news/newsList';
import NewsCard from '../news/newsCard';
import { requestPosts } from '../../store/actions/actions';
import { usePagination } from '../usePagination';

import './mainPage.css';

const PAGE_CAP = 5;

function MainPage() {
  const posts = useSelector(state => state.posts);
  const loaderStatus = useSelector(state => state.showLoader);
  const [pageItems, setPage, binder] = usePagination(posts, PAGE_CAP);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestPosts());
  }, [])

  useEffect(() => {
    setPage(1);
  }, [posts]);

  const topPanelConfigs = {
    className: 'header',
    title: 'News',
    titleActive: true,
    titleEvent: () => dispatch(requestPosts()),
    search: true,
    onSearch: ({ filter, search }) => {
      const query = `/?filter=${filter}&search=${search}`;
      dispatch(requestPosts(query));
    },
  };

  return (
    <div className="main-page">
      <TopPanel {...topPanelConfigs} />
      <div className="content">
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
                : <Typography variant="h4">There Are No Posts Here!</Typography>
          }
        </NewsList>
        <Pagination
          className="pagination"
          variant="outlined"
          color="primary"
          size="large"
          {...binder}
        />
      </div>
    </div>
  );
}

export default MainPage;