import React from 'react'
import { Paper, Button, Divider, Link, CircularProgress, makeStyles } from '@material-ui/core'
import { Form } from 'react-final-form'
import { required, email, maxLength32, maxLength128 } from '../../utils/validators'
import FormTextField from '../FormTextField'
import style from './style'

const useStyles = makeStyles(style)

export default function SignUpFormCard({ onSubmit, submitting }) {
    const classes = useStyles()

    return (
        <Form onSubmit={onSubmit}>
            {({ handleSubmit, valid }) => (
                <form onSubmit={handleSubmit}>
                    <Paper classes={classes}>
                        <FormTextField name='email' label='*Email' validators={[required, email, maxLength32]} />
                        <FormTextField name='password' label='*Password' validators={[required, maxLength128]} />
                        <FormTextField name='username' label='Username' validators={[maxLength32]} />
                        <Button type='submit' disabled={!valid || submitting}>
                            {
                                submitting
                                ? <CircularProgress size={24} />
                                : 'Sign Up'
                            }
                        </Button>
                        <Divider />
                        <Link href='signin'>Sign In</Link>
                    </Paper>
                </form>
            )}
        </Form>
    )
}
