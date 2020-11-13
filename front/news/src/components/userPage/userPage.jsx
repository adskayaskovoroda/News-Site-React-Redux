import React, {
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { reset } from 'redux-form';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@material-ui/core/IconButton';
import PostAddRoundedIcon from '@material-ui/icons/PostAddRounded';
import TopPanel from '../topPanel/topPanel';
import Tabs from '../tabs/tabs';
import UserCard from '../userCard/userCard';
import NewsCard from '../news/newsCard';
import NewsList from '../news/newsList';
import NewPostDialog from './newPostDialog';
import {
  requestUser,
  updateUser,
  createPost,
} from '../../store/actions/actions';
import { usePagination } from '../usePagination';
import { useSnackbar } from 'notistack';
import { ERROR } from '../../store/actions/types';

import './userPage.css';

const PAGE_CAP = 5;

function UserPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const history = useHistory();
  const { userID } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts);
  const user = useSelector(state => state.user);
  const myID = useSelector(state => state.me.id);
  const { enqueueSnackbar } = useSnackbar();
  const error = useSelector(state => state.error);

  useEffect(() => {
    if (error.isErrorOccurred) {
      enqueueSnackbar(error.text, {
        variant: 'error',
      });
      dispatch({
        type: ERROR,
        payload: {},
      });
    }
  }, [error]);

  useEffect(() => {
    console.log('Mount user page');
    dispatch(requestUser(userID));
  }, []);

  useEffect(() => {
    setPage(1);
  }, [posts]);

  useEffect(() => {
    dispatch(requestUser(userID));
  }, [userID]);

  const onSaveUser = (values) => {
    dispatch(updateUser(userID, values));
    dispatch(reset('user-form'));
  }

  const onCloseModal = () => {
    setOpenDialog(false);
    dispatch(reset('new-post-form'));
  }

  const onSavePost = (values) => {
    onCloseModal();
    dispatch(createPost(values));
  }

  const [pageItems, setPage, binder] = usePagination(posts, PAGE_CAP);

  const tabsList = useMemo(() => [
    {
      text: 'Profile',
      value: 'profile',
    },
    {
      text: 'Posts List',
      value: 'posts',
    },
  ], []);
  const [tab, setTab] = useState(tabsList[0].value);

  const switchContent = () => {
    switch (tab) {
      case 'profile':
        return (
          <div className="content">
            {user && <UserCard user={user} onSubmit={onSaveUser} />}
          </div>
        );
      case 'posts':
        return (
          <div className="content">
            <Pagination
              className="pagination"
              variant="outlined"
              color="primary"
              size="large"
              {...binder}
            />
            <NewsList>
              {pageItems.map(el => <NewsCard data={el} key={el.id} />)}
            </NewsList>
            <Pagination
              className="pagination"
              variant="outlined"
              color="primary"
              size="large"
              {...binder}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="user-page">
      <TopPanel
        className="header"
        title="News"
        titleActive
        titleEvent={() => history.push('/')}
      />
      <Tabs
        className="menu"
        curTab={tab}
        setTab={setTab}
        items={tabsList}
      />
      {myID == userID &&
        <IconButton
          className="add-new-post"
          variant="outlined"
          color="primary"
          onClick={() => setOpenDialog(true)}
        >
          <PostAddRoundedIcon fontSize="large" />
        </IconButton>
      }
      {switchContent()}
      <NewPostDialog
        open={openDialog}
        close={onCloseModal}
        onSubmit={onSavePost}
      />
    </div>
  );
}

export default UserPage;