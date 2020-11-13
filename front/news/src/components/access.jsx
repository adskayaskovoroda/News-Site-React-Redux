import React from 'react';
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { checkAccess } from '../store/actions/actions';

function Access({ children, redirect = "/login" }) {
  const dispatch = useDispatch();
  const history = useHistory();
  dispatch(checkAccess());
  const access = useSelector((state) => state.access)

  if (!access.isGranted) {
    history.push(redirect);
  }

  return access.isGranted && children;
}

Access.propTypes = {
  children: PropTypes.node.isRequired,
  redirect: PropTypes.string,
}

Access.defaultProps = {
  redirect: '/login',
}

export default React.memo(Access);
