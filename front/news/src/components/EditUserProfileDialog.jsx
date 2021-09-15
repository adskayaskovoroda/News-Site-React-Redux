import React from 'react'
import { 
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, makeStyles
} from '@material-ui/core'
import { Form } from 'react-final-form'
import FormFileField from './FormFileField'
import FormTextField from './FormTextField'
import { email, maxLength32, maxLength128 } from '../utils/validators'

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(2)}px`
    },
    avatarButton: {
        display: 'flex',
        justifyContent: 'center'
    }
}))

export default function EditUserProfileDialog({ open, onClose, initialValues, onSubmit, credentialsEdit }) {
    const classes = useStyles()

    return (
        <Dialog open={open} fullWidth>
            <Form initialValues={initialValues} onSubmit={onSubmit}>
                {({ handleSubmit, pristine, submitting, valid }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogContent className={classes.content}>
                            {credentialsEdit &&
                                <>
                                    <div className={classes.avatarButton}><FormFileField name='avatar' /></div>
                                    <FormTextField
                                        name='email'
                                        label='Email'
                                        validators={[email, maxLength32]}
                                        size='small'
                                    />
                                    <FormTextField
                                        name='password'
                                        label='Password'
                                        validators={[maxLength128]}
                                        size='small'
                                        type='password'
                                    />
                                </>
                            }
                            <FormTextField
                                name='username'
                                label='Username'
                                validators={[maxLength32]}
                                size='small'
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type='submit'
                                color='primary'
                                disabled={pristine || submitting || !valid}
                            >
                                Confirm
                            </Button>
                            <Button onClick={onClose} color='default'>Cancel</Button>
                        </DialogActions>
                    </form>
                )}
            </Form>
        </Dialog>
    )
}