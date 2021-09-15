import React from 'react'
import { Fab, Tooltip } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

export default function AddPostButton({ onClick, className }) {
    return (
        <Tooltip title='Create New Post' arrow>
            <Fab color='primary' className={className} onClick={onClick}>
                <AddIcon />
            </Fab>
        </Tooltip>
    )
}
