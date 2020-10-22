import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import '../styles/newsCard.css';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function NewsCard({ data }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className="news-card" variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.username.slice(0,2).toLocaleUpperCase()}
          </Avatar>
        }
        title={data.username}
      />
      <CardMedia
        className="news-card__media"
        image={`/img/${data.image || 'noImage.jpg'}`}
      />
      <CardContent className="news-card__controls">
        <Typography gutterBottom variant="h5" component="h2" className='news-card__title'>
          {data.title}
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {data.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

NewsCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    tagsList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
}

export default NewsCard;