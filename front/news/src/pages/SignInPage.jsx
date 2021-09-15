import React, { useCallback, useMemo, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import GoogleLogin from 'react-google-login'
import { Divider, makeStyles } from '@material-ui/core'
import SignInFormCard from '../components/authentication/SignInFormCard'
import AlertSnackbar from '../components/AlertSnackbar';
import { signIn, oauth, submittingStatus, setSubmittingStatus } from '../store/actions/actions'
import { authCardStyle } from './styles'

const useStyles = makeStyles(authCardStyle)

export default function SignInPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const classes = useStyles()
    const signInSubmit = useCallback(values => {
        dispatch(signIn(values.email, values.password))
    }, [])
    const googleSignInSubmit = useCallback(({ accessToken }) => {
        dispatch(oauth(accessToken))
    }, [])
    const signInSubmitting = useSelector(state => state.submitting)
    const isSubmitting = useMemo(() => signInSubmitting.status === submittingStatus.START, [signInSubmitting.status])
    const alertStatus = useMemo(() => signInSubmitting.status === submittingStatus.ERROR, [signInSubmitting.status])
    const closeError = useCallback(() => dispatch(setSubmittingStatus({ status: submittingStatus.NONE })), [])

    useEffect(() => {
        if (signInSubmitting.status !== submittingStatus.OK)
            return
        history.push('/')
        dispatch(setSubmittingStatus({ status: submittingStatus.NONE }))
    }, [signInSubmitting.status])

    return (
        <div className={classes.root}>
            <SignInFormCard onSubmit={signInSubmit} submitting={isSubmitting} />
            <Divider />
            <GoogleLogin
                clientId='399978654308-3e8ua5aad8pbsmrgm6ufav37omiubn3f.apps.googleusercontent.com'
                buttonText='Sign in with Google'
                onSuccess={googleSignInSubmit}
                cookiePolicy='single_host_origin'
            />
            <AlertSnackbar open={alertStatus} onClose={closeError} message={signInSubmitting.message} />
        </div>
    )
}
