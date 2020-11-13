import React from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import InputAdorment from '@material-ui/core/InputAdornment';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';

import './searchForm.css';

function search({ input }) {
  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdorment position="start">
            <ArrowForwardIosIcon />
          </InputAdorment>
        ),
      }}
      {...input}
    />
  );
}

function filter({ input }) {
  const FILTER_TYPES = [
    {
      value: 'all',
      text: 'All',
    },
    {
      value: 'author',
      text: 'Author',
    },
    {
      value: 'tags',
      text: 'Tags',
    },
  ];

  return (
    <div className="select-wrapper">
      <TextField
        variant="outlined"
        size="small"
        label="Filter"
        select
        fullWidth
        {...input}
      >
        {FILTER_TYPES.map((el, i) => <MenuItem value={el.value} key={i}>{el.text}</MenuItem>)}
      </TextField>
    </div>
  );
}

function SearchForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <Field name="search" component={search} />
      <Field name="filter" component={filter} />
      <IconButton
        color="inherit"
        type="submit"
      >
        <SearchIcon />
      </IconButton>
    </form>
  );
}

export default reduxForm({
  form: 'test-form',
  initialValues: {
    'search': '',
    'filter': 'all',
  },
})(SearchForm);