import React from 'react';
import ReactDOM from 'react-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';

import { Provider } from 'react-redux';
import theme from './theme.js'
import store from './store';
import App2 from './App'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <CssBaseline/>
      <App2 />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);