import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import PostCard from './PostCard'
import usePagination from '../components/usePagination'

const useStyles = makeStyles(theme => ({
    postsList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: `${theme.spacing(4)}px`,
    },
    pagination: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        '& > ul': {
            justifyContent: 'center',
        },
    },
}))

export default function PostsWithPagination({ posts, pageCap }) {
    const classes = useStyles()
    const [pageItems, setPage, { onChange, ...binder }] = usePagination(posts, pageCap)

    const setPageWithScroll = (_, page) => {
        window.scrollTo(0,0)
        setPage(page)
    }

    useEffect(() => {
        setPage(1)
    }, [posts])

    return (
        <>
            <Pagination className={classes.pagination} onChange={onChange} {...binder} />
            <div className={classes.postsList}>
                {pageItems.map(post => <PostCard post={post} key={post.id} />)}
            </div>
            <Pagination className={classes.pagination} onChange={setPageWithScroll} {...binder} />
        </>
    )
}
