import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Typography, makeStyles, Avatar, Menu, MenuItem } from '@material-ui/core'
import SearchForm from './SearchForm'

const useStyles = makeStyles(theme => ({
    root: {
        gap: `${theme.spacing(2)}px`
    },
    avatar: {
        marginLeft: 'auto',
    },
}))

export default function TopPanel({ title, user, search, onSearch=() => {} }) {
    const history = useHistory()
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = useCallback(
        event => setAnchorEl(event.currentTarget),
        []
    )
    const closeMenu = useCallback(
        () => setAnchorEl(null),
        []
    )
    const redirectToMe = useCallback(
        () => history.push(`/user/${user.id}`),
        [user.id]
    )
    const logout = useCallback(
        () => {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            history.push('/signin')
        },
        []
    )
    

    return (
        <AppBar position='static'>
            <Toolbar className={classes.root}>
                <Typography variant='h6'>{title}</Typography>
                {search && <SearchForm onSubmit={onSearch} />}
                <Avatar src={user.avatar} onClick={openMenu} className={classes.avatar} />
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeMenu}
                >
                    <MenuItem onClick={redirectToMe}>Profile</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}
