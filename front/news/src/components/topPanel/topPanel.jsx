import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchForm from '../searchForm/searchForm';

import './topPanel.css';
import { setAccess } from '../../store/actions/actions';

function TopPanel({
  title,
  titleActive,
  titleEvent,
  search,
  onSearch,
  className,
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const me = useSelector(state => state.me);
  const openMenu = event => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const redirectToMe = () => history.push(`/user/${me.id}`);
  const logout = () => {
    dispatch(setAccess(null));
    history.push('/login');
  }

  return (
    <div className={`top-panel ${className}`}>
      <AppBar position="static">
        <Toolbar className="container">
          <Typography
            variant="h6"
            className={'top-panel__title ' + (titleActive ? 'top-panel__title_active' : '')}
            onClick={titleEvent}
          >
            {title}
          </Typography>
          {search && <SearchForm className="top-panel__search" onSubmit={onSearch} />}
          <Avatar src={me.avatar} onClick={openMenu} className="top-panel__profile" />
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={closeMenu}
          >
            <MenuItem onClick={redirectToMe}>Profile</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}

TopPanel.propTypes = {
  title: PropTypes.string.isRequired,
  titleActive: PropTypes.bool,
  titleEvent: PropTypes.func,
  search: PropTypes.bool,
  onSearch: PropTypes.func,
  className: PropTypes.string,
};

TopPanel.defaultProps = {
  titleActive: false,
  titleEvent: () => {},
  search: false,
  onSearch: () => {},
  className: '',
};

export default React.memo(TopPanel);