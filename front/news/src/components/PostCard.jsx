import React from 'react'
import {
    Card, CardHeader, CardContent, CardMedia,
    Avatar, Typography, Chip, Divider, makeStyles
} from '@material-ui/core'
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    root: {
        width: '600px',
    },
    avatar: {
        cursor: 'pointer',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    content: {
        '& > :last-child': {
            marginBottom: 0
        },
    },
    tags: {
        padding: theme.spacing(1),
        display: 'flex',
        flexWrap: 'wrap',
        gap: `${theme.spacing(0.25)}px`
    },
}))

export default function PostCard({ post }) {
    const history = useHistory()
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar
                        className={classes.avatar}
                        src={post.author.avatar}
                        onClick={() => history.push(`/user/${post.author.id}`)}
                    />
                }
                title={post.author.nickname}
            />
            {post.image &&
                <CardMedia
                    className={classes.media}
                    image={post.image}
                />
            }
            <CardContent className={classes.content}>
                <Typography paragraph gutterBottom variant='h5' noWrap>{post.title}</Typography>
                {   // Split by \n\n to different paragraphs
                    post.content.split('\n\n').filter(value => value).map((value, index) =>
                        <Typography paragraph key={index}>{value.replace(/^\n|\n$/g, '')}</Typography>
                    )
                }
            </CardContent>
            {post.tags.length !== 0 && 
                <>
                    <Divider />
                    <CardContent className={classes.tags}>
                        {post.tags.map((value, index) => 
                            <Chip
                                label={value}
                                clickable
                                key={index}
                            />
                        )}
                    </CardContent>
                </>
            }
        </Card>
    )
}
