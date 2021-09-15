import React from 'react'
import { Card, CardMedia, CardContent, Typography, IconButton, makeStyles } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import AddPostButton from './AddPostButton';

const useStyles = makeStyles(theme => ({
    userCard: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(2)}px`,
        overflow: 'visible',
        paddingBottom: theme.spacing(2)
    },
    editButton: {
        position: 'absolute',
        marginTop: theme.spacing(0.5),
        marginRight: theme.spacing(0.5),
        right: 0,
    },
    userAvatar: {
        width: '200px',
        height: '200px',
    },
    userInfo: {
        paddingTop: theme.spacing(1),
    },
    fab: {
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }
}))

function EditButton({ className, onClick }) {
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

export default function UserCard({ user, edit = false, onNewPost, onEditProfile }) {
    const classes = useStyles()

    return (
        <Card className={classes.userCard}>
            {edit &&
                <EditButton
                    className={classes.editButton}
                    onClick={onEditProfile}
                />
            }
            <CardMedia
                className={classes.userAvatar}
                image={user.avatar}
            />
            <CardContent className={classes.userInfo}>
                <Typography align='center'>{user.nickname}</Typography>
            </CardContent>
            {edit && <AddPostButton onClick={onNewPost} className={classes.fab} />}
        </Card>
    )
}


