import React from 'react';
import { useDispatch } from 'react-redux'
import { requestPosts } from '../../store/actions/actionCreators';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import './topPanel.css';

const FILTER_TYPES = [
  {
    text: 'All',
    value: 'all',
  },
  {
    text: 'Author',
    value: 'author',
  },
  {
    text: 'Tag',
    value: 'tags',
  },
];

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1.5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function TopPanel() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [filterType, setFilterType] = React.useState(FILTER_TYPES[0].value);
  const [searchBody, setSearchBody] = React.useState('')
  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchBody(event.target.value);
  };
  const sendSearchRequest = () => {
    dispatch(requestPosts(`/?filter=${filterType}&search=${searchBody}`));
  };

  return (
    <div className="top-panel">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="top-panel__home" onClick={() => dispatch(requestPosts())}>
            News
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <ArrowForwardIosIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              defaultValue={searchBody}
              onChange={handleSearchChange}
            />
          </div>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="filter-label">Filter</InputLabel>
            <Select
              labelId="filter-label"
              value={filterType}
              onChange={handleFilterChange}
              label="Filter"
            >
              {FILTER_TYPES.map(el => <MenuItem value={el.value}>{el.text}</MenuItem>)}
            </Select>
          </FormControl>
          <IconButton onClick={sendSearchRequest}>
            <SearchIcon className="top-panel__send-search" />
          </IconButton>
          <Button color="inherit" className="top-panel__login">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}