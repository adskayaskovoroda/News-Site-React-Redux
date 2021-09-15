import React from 'react'
import { IconButton, makeStyles } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { Field } from 'react-final-form'

const useStyles = makeStyles(theme => ({
    avatarUpload: {
        display: 'none'
    }
}))

export default function FormFileField({ name, ...buttonProps }) {
    const classes = useStyles()

    return (
        <Field name={name}>
            {({ input: { value, onChange, ...input } }) => (
                <>
                    <input
                        type='file'
                        accept='image/*'
                        id='avatar-upload'
                        className={classes.avatarUpload}
                        onChange={({ target }) => onChange(target.files[0])}
                        {...input}
                    />
                    <label htmlFor='avatar-upload'>
                        <IconButton color='primary' component='span' {...buttonProps}>
                            <PhotoCamera fontSize={buttonProps?.size} />
                        </IconButton>
                    </label>
                </>
            )}
        </Field>
    )
}
