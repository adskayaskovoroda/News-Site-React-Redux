import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Draggable from 'react-draggable'
import { LinearProgress, makeStyles } from '@material-ui/core'
import TopPanel from '../components/TopPanel'
import UserCard from '../components/UserCard'
import PostsWithPagination from '../components/PostsWithPagination'
import CreateNewPostDialog from '../components/CreateNewPostDialog'
import EditUserProfileDialog from '../components/EditUserProfileDialog'
import { fetchUser, fetchPosts, loadingStatus, createPost, updateUser } from '../store/actions/actions'
import { difference } from '../utils/utils'

const useStyles = makeStyles(theme => ({
    userCard: {
        position: 'absolute',
        top: theme.spacing(12),
        left: theme.spacing(3),
    }
}))

export default function UserPage() {
    const dispatch = useDispatch()
    const classes = useStyles()
    const { userId } = useParams()

    const myId = useSelector(state => state.me.data.id)
    const posts = useSelector(state => state.posts)
    const user = useSelector(state => state.user)

    const [openNewPost, setOpenNewPost] = useState(false)
    const [openEditProfile, setOpenEditProfile] = useState(false)

    const openNewPostDialog = useCallback(() => setOpenNewPost(true), [setOpenNewPost])
    const closeNewPostDialog = useCallback(() => setOpenNewPost(false), [setOpenNewPost])

    const openEditProfileDialog = useCallback(() => setOpenEditProfile(true), [setOpenEditProfile])
    const closeEditProfileDialog = useCallback(() => setOpenEditProfile(false), [setOpenEditProfile])
    
    const submitNewPost = useCallback(values => { dispatch(createPost(values)) }, [])
    const submitEditProfile = useCallback(values => {
        const diff = difference(user.data, values)
        dispatch(updateUser(user.data.id, diff))
        closeEditProfileDialog()
    }, [user])

    useEffect(() => {
        dispatch(fetchUser(userId))
        dispatch(fetchPosts(userId, 'api_user_id'))
    }, [userId])

    return (
        (user.loading === loadingStatus.LOADING || user.loading === loadingStatus.NONE)
        ||
        (posts.loading === loadingStatus.LOADING || posts.loading === loadingStatus.NONE)
            ? <LinearProgress />
            : <>
                <TopPanel user={user.data} title='Material News' />
                <PostsWithPagination posts={posts.data} pageCap={5} />
                <CreateNewPostDialog
                    open={openNewPost}
                    onClose={closeNewPostDialog}
                    onSubmit={submitNewPost}
                />
                <EditUserProfileDialog
                    open={openEditProfile}
                    onClose={closeEditProfileDialog}
                    onSubmit={submitEditProfile}
                    initialValues={user.data}
                    credentialsEdit={user.data.oauth_type === 0}
                />
                <Draggable>
                    <div className={classes.userCard}>
                        <UserCard
                            user={user.data}
                            edit={myId == userId}
                            onNewPost={openNewPostDialog}
                            onEditProfile={openEditProfileDialog}
                        />
                    </div>
                </Draggable>
            </>
    )
}
