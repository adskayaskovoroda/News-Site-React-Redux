import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { LinearProgress } from '@material-ui/core'
import { isLoggedIn } from '../utils/utils'
import { fetchMe, loadingStatus } from '../store/actions/actions'

export default function PrivateRoute({ children, redirect = '/signin', ...rest }) {
    const dispatch = useDispatch()
    const me = useSelector(state => state.me)

    useEffect(() => {
        dispatch(fetchMe())
    }, [])

    return (
        <Route path={rest.path} exact={rest.exact}>
            {
                me.loading === loadingStatus.LOADING || me.loading === loadingStatus.NONE
                    ? <LinearProgress />
                    : isLoggedIn() && me.loading === loadingStatus.OK
                        ? children
                        : <Redirect to={redirect} />
            }
        </Route>
    )
}
