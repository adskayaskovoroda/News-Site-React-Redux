import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress, makeStyles } from '@material-ui/core'
import TopPanel from '../components/TopPanel'
import PostsWithPagination from '../components/PostsWithPagination'
import AlertSnackbar from '../components/AlertSnackbar'
import { fetchPosts, loadingStatus } from '../store/actions/actions'

const useStyles = makeStyles(theme => ({
    progress: {
        display: 'block',
        margin: '0 auto',
        marginTop: theme.spacing(3)
    }
}))

const PAGE_CAP = 5

export default function MainPage() {
    const dispatch = useDispatch()
    const classes = useStyles()
    const me = useSelector(state => state.me.data)
    const posts = useSelector(state => state.posts)
    const onSearch = useCallback(({ search, filter }) => {
        dispatch(fetchPosts(search, filter))
    }, [])

    useEffect(() => {
        dispatch(fetchPosts())
    }, [])

    return (
        <>
            <TopPanel title='Material News' user={me} search onSearch={onSearch} />
            {
                posts.loading === loadingStatus.LOADING || posts.loading === loadingStatus.NONE
                    ? <CircularProgress className={classes.progress} size={96} />
                    : <PostsWithPagination posts={posts.data} pageCap={PAGE_CAP} />
            }
            <AlertSnackbar />
        </>
    )
}
