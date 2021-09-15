import React, { useCallback, useMemo, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Divider, makeStyles } from '@material-ui/core'
import GoogleLogin from 'react-google-login'
import SignUpFormCard from '../components/authentication/SignUpFormCard'
import AlertSnackbar from '../components/AlertSnackbar';
import { signUp, submittingStatus, setSubmittingStatus } from '../store/actions/actions'
import { authCardStyle } from './styles'

const useStyles = makeStyles(authCardStyle)

function printResponse({ accessToken }) {
    console.log(accessToken)
}

export default function SignUpPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const signUnSubmit = useCallback(values => {
        dispatch(signUp(values))
    }, [])
    const signUnSubmitting = useSelector(state => state.submitting)
    const isSubmitting = useMemo(() => signUnSubmitting.status === submittingStatus.START, [signUnSubmitting.status])
    const alertStatus = useMemo(() => signUnSubmitting.status === submittingStatus.ERROR, [signUnSubmitting.status])
    const closeError = useCallback(() => dispatch(setSubmittingStatus({ status: submittingStatus.NONE })), [])

    useEffect(() => {
        if (signUnSubmitting.status !== submittingStatus.OK)
            return
        history.push('/')
        dispatch(setSubmittingStatus({ status: submittingStatus.NONE }))
    }, [signUnSubmitting.status])

    return (
        <div className={classes.root}>
            <SignUpFormCard onSubmit={signUnSubmit} submitting={isSubmitting} />
            <Divider />
            <GoogleLogin
                clientId='399978654308-3e8ua5aad8pbsmrgm6ufav37omiubn3f.apps.googleusercontent.com'
                buttonText='Sign in with Google'
                onSuccess={printResponse}
                onFailure={printResponse}
                cookiePolicy='single_host_origin'
            />
            <AlertSnackbar open={alertStatus} onClose={closeError} message={signUnSubmitting.message} />
        </div>
    )
}
