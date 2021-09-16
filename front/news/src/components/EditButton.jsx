import React from 'react'
import { IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';

export default function EditButton({ className, onClick }) {
    return (
        <IconButton
            size='small'
            className={className}
            onClick={onClick}
        >
            <EditIcon fontSize='small' color='primary' />
        </IconButton>
    )
}
