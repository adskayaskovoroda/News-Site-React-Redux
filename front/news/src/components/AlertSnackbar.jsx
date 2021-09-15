import React from 'react'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

export default function AlertSnackbar({ open, onClose, message }) {
    return (
        <Snackbar open={open}>
            <Alert severity='error' onClose={onClose}>{message}</Alert>
        </Snackbar>
    )
}
